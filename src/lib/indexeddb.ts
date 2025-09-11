/**
 * IndexedDB Service for WorkFlowZen
 * Handles storage and retrieval of form data including:
 * - Consultations
 * - Service Requests
 * - Payment Requests
 * - Service Deliveries
 * - Purchase Orders
 * - Invoice Receipts
 * - Documents
 */

export interface StoredData {
  id: string;
  type: 'consultation' | 'service-request' | 'payment-request' | 'service-delivery' | 'purchase-order' | 'invoice-receipt' | 'document';
  data: any;
  createdAt: string;
  updatedAt: string;
  status?: string;
}

class IndexedDBService {
  private dbName = 'WorkFlowZenDB';
  private version = 1;
  private db: IDBDatabase | null = null;
  private allStoreNames = ['consultations', 'serviceRequests', 'paymentRequests', 'serviceDeliveries', 'purchaseOrders', 'invoiceReceipts', 'documents', 'appState'];

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => {
        reject(new Error('Failed to open IndexedDB'));
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create object stores for different data types
        if (!db.objectStoreNames.contains('consultations')) {
          const consultationStore = db.createObjectStore('consultations', { keyPath: 'id' });
          consultationStore.createIndex('createdAt', 'createdAt', { unique: false });
          consultationStore.createIndex('status', 'status', { unique: false });
        }

        if (!db.objectStoreNames.contains('serviceRequests')) {
          const serviceRequestStore = db.createObjectStore('serviceRequests', { keyPath: 'id' });
          serviceRequestStore.createIndex('createdAt', 'createdAt', { unique: false });
          serviceRequestStore.createIndex('status', 'status', { unique: false });
          serviceRequestStore.createIndex('priority', 'data.priority', { unique: false });
        }

        if (!db.objectStoreNames.contains('paymentRequests')) {
          const paymentRequestStore = db.createObjectStore('paymentRequests', { keyPath: 'id' });
          paymentRequestStore.createIndex('createdAt', 'createdAt', { unique: false });
          paymentRequestStore.createIndex('status', 'status', { unique: false });
          paymentRequestStore.createIndex('urgency', 'data.urgency', { unique: false });
        }

        if (!db.objectStoreNames.contains('serviceDeliveries')) {
          const serviceDeliveryStore = db.createObjectStore('serviceDeliveries', { keyPath: 'id' });
          serviceDeliveryStore.createIndex('createdAt', 'createdAt', { unique: false });
          serviceDeliveryStore.createIndex('status', 'status', { unique: false });
          serviceDeliveryStore.createIndex('completionStatus', 'data.completionStatus', { unique: false });
        }

        if (!db.objectStoreNames.contains('purchaseOrders')) {
          const purchaseOrderStore = db.createObjectStore('purchaseOrders', { keyPath: 'id' });
          purchaseOrderStore.createIndex('createdAt', 'createdAt', { unique: false });
          purchaseOrderStore.createIndex('status', 'status', { unique: false });
          purchaseOrderStore.createIndex('supplier', 'data.supplier', { unique: false });
        }

        if (!db.objectStoreNames.contains('invoiceReceipts')) {
          const invoiceReceiptStore = db.createObjectStore('invoiceReceipts', { keyPath: 'id' });
          invoiceReceiptStore.createIndex('createdAt', 'createdAt', { unique: false });
          invoiceReceiptStore.createIndex('status', 'status', { unique: false });
          invoiceReceiptStore.createIndex('vendorName', 'data.vendorName', { unique: false });
        }

        if (!db.objectStoreNames.contains('documents')) {
          const documentStore = db.createObjectStore('documents', { keyPath: 'id' });
          documentStore.createIndex('createdAt', 'createdAt', { unique: false });
          documentStore.createIndex('status', 'status', { unique: false });
          documentStore.createIndex('category', 'data.category', { unique: false });
          documentStore.createIndex('title', 'data.title', { unique: false });
        }

        // App-level state (singleton key/value store)
        if (!db.objectStoreNames.contains('appState')) {
          db.createObjectStore('appState', { keyPath: 'key' });
        }
      };
    });
  }

  private async ensureDB(): Promise<IDBDatabase> {
    if (!this.db) {
      await this.init();
    }
    if (!this.db) {
      throw new Error('Database not initialized');
    }
    return this.db;
  }

  private getStoreName(type: StoredData['type']): string {
    const storeMap = {
      'consultation': 'consultations',
      'service-request': 'serviceRequests',
      'payment-request': 'paymentRequests',
      'service-delivery': 'serviceDeliveries',
      'purchase-order': 'purchaseOrders',
      'invoice-receipt': 'invoiceReceipts',
      'document': 'documents'
    };
    return storeMap[type];
  }

  async save(type: StoredData['type'], data: any, id?: string): Promise<string> {
    const db = await this.ensureDB();
    const storeName = this.getStoreName(type);
    
    const record: StoredData = {
      id: id || this.generateId(),
      type,
      data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: data.status || 'active'
    };

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(record);

      request.onsuccess = () => {
        resolve(record.id);
      };

      request.onerror = () => {
        reject(new Error(`Failed to save ${type} data`));
      };
    });
  }

  async getAll(type: StoredData['type']): Promise<StoredData[]> {
    const db = await this.ensureDB();
    const storeName = this.getStoreName(type);

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        const results = request.result || [];
        // Sort by creation date, newest first
        results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        resolve(results);
      };

      request.onerror = () => {
        reject(new Error(`Failed to retrieve ${type} data`));
      };
    });
  }

  async getById(type: StoredData['type'], id: string): Promise<StoredData | null> {
    const db = await this.ensureDB();
    const storeName = this.getStoreName(type);

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(id);

      request.onsuccess = () => {
        resolve(request.result || null);
      };

      request.onerror = () => {
        reject(new Error(`Failed to retrieve ${type} with id ${id}`));
      };
    });
  }

  async update(type: StoredData['type'], id: string, data: any): Promise<void> {
    const existing = await this.getById(type, id);
    if (!existing) {
      throw new Error(`${type} with id ${id} not found`);
    }

    const updated: StoredData = {
      ...existing,
      data,
      updatedAt: new Date().toISOString(),
      status: data.status || existing.status
    };

    const db = await this.ensureDB();
    const storeName = this.getStoreName(type);

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.put(updated);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(new Error(`Failed to update ${type} with id ${id}`));
      };
    });
  }

  async delete(type: StoredData['type'], id: string): Promise<void> {
    const db = await this.ensureDB();
    const storeName = this.getStoreName(type);

    return new Promise((resolve, reject) => {
      const transaction = db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(id);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(new Error(`Failed to delete ${type} with id ${id}`));
      };
    });
  }

  async search(type: StoredData['type'], filters: { [key: string]: any }): Promise<StoredData[]> {
    const allRecords = await this.getAll(type);
    
    return allRecords.filter(record => {
      return Object.entries(filters).every(([key, value]) => {
        if (key === 'status') {
          return record.status === value;
        }
        
        // Check nested data properties
        const dataValue = this.getNestedValue(record.data, key);
        if (typeof value === 'string' && typeof dataValue === 'string') {
          return dataValue.toLowerCase().includes(value.toLowerCase());
        }
        
        return dataValue === value;
      });
    });
  }

  async getStats(type: StoredData['type']): Promise<{ total: number; byStatus: { [key: string]: number } }> {
    const records = await this.getAll(type);
    const byStatus: { [key: string]: number } = {};
    
    records.forEach(record => {
      const status = record.status || 'unknown';
      byStatus[status] = (byStatus[status] || 0) + 1;
    });

    return {
      total: records.length,
      byStatus
    };
  }

  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // App state helpers
  async setAppState<T = any>(key: string, value: T): Promise<void> {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['appState'], 'readwrite');
      const store = transaction.objectStore('appState');
      const request = store.put({ key, value, updatedAt: new Date().toISOString() });
      request.onsuccess = () => resolve();
      request.onerror = () => reject(new Error('Failed to set app state'));
    });
  }

  async getAppState<T = any>(key: string): Promise<T | null> {
    const db = await this.ensureDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['appState'], 'readonly');
      const store = transaction.objectStore('appState');
      const request = store.get(key);
      request.onsuccess = () => {
        resolve(request.result ? (request.result.value as T) : null);
      };
      request.onerror = () => reject(new Error('Failed to get app state'));
    });
  }

  async clearAll(type?: StoredData['type']): Promise<void> {
    const db = await this.ensureDB();
    
    if (type) {
      const storeName = this.getStoreName(type);
      return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.clear();

        request.onsuccess = () => resolve();
        request.onerror = () => reject(new Error(`Failed to clear ${type} data`));
      });
    } else {
      // Clear all stores (including appState)
      const storeNames = this.allStoreNames;
      const promises = storeNames.map(storeName => {
        return new Promise<void>((resolve, reject) => {
          const transaction = db.transaction([storeName], 'readwrite');
          const store = transaction.objectStore(storeName);
          const request = store.clear();

          request.onsuccess = () => resolve();
          request.onerror = () => reject(new Error(`Failed to clear ${storeName}`));
        });
      });

      await Promise.all(promises);
    }
  }

  // Backup all stores into a JSON-serializable bundle
  async exportAll(): Promise<any> {
    const db = await this.ensureDB();
    const readStore = (storeName: string): Promise<any[]> => {
      return new Promise((resolve, reject) => {
        const tx = db.transaction([storeName], 'readonly');
        const store = tx.objectStore(storeName);
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(new Error(`Failed to read store ${storeName}`));
      });
    };

    const entries = await Promise.all(this.allStoreNames.map(async (name) => {
      const data = await readStore(name);
      return [name, data] as const;
    }));

    const payload: any = {
      meta: {
        dbName: this.dbName,
        version: this.version,
        exportedAt: new Date().toISOString(),
      },
      stores: Object.fromEntries(entries),
    };
    return payload;
  }

  // Restore all stores from a previously exported bundle
  async importAll(bundle: any): Promise<void> {
    if (!bundle || typeof bundle !== 'object' || !bundle.stores) {
      throw new Error('Invalid backup bundle');
    }
    const db = await this.ensureDB();
    // Clear all first
    await this.clearAll();

    const storeNames = Object.keys(bundle.stores) as string[];
    for (const storeName of storeNames) {
      if (!this.allStoreNames.includes(storeName)) continue;
      const records: any[] = bundle.stores[storeName] || [];
      if (records.length === 0) continue;
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction([storeName], 'readwrite');
        const store = tx.objectStore(storeName);
        for (const rec of records) {
          store.put(rec);
        }
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(new Error(`Failed to import into ${storeName}`));
        tx.onabort = () => reject(new Error(`Aborted import into ${storeName}`));
      });
    }
  }
}

// Create singleton instance
const dbService = new IndexedDBService();

export default dbService;

// Export convenience functions
export const saveData = (type: StoredData['type'], data: any, id?: string) => dbService.save(type, data, id);
export const getAllData = (type: StoredData['type']) => dbService.getAll(type);
export const getDataById = (type: StoredData['type'], id: string) => dbService.getById(type, id);
export const updateData = (type: StoredData['type'], id: string, data: any) => dbService.update(type, id, data);
export const deleteData = (type: StoredData['type'], id: string) => dbService.delete(type, id);
export const searchData = (type: StoredData['type'], filters: { [key: string]: any }) => dbService.search(type, filters);
export const getDataStats = (type: StoredData['type']) => dbService.getStats(type);
export const initDB = () => dbService.init();