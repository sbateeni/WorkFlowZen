import { useState, useEffect, useCallback } from 'react';
import dbService, { StoredData, saveData, getAllData, getDataById, updateData, deleteData, searchData, getDataStats, initDB } from '@/lib/indexeddb';

export interface UseIndexedDBResult<T = any> {
  data: StoredData[];
  loading: boolean;
  error: string | null;
  save: (data: T, id?: string) => Promise<string>;
  update: (id: string, data: T) => Promise<void>;
  remove: (id: string) => Promise<void>;
  getById: (id: string) => Promise<StoredData | null>;
  search: (filters: { [key: string]: any }) => Promise<StoredData[]>;
  stats: { total: number; byStatus: { [key: string]: number } } | null;
  refresh: () => Promise<void>;
  clear: () => Promise<void>;
}

export function useIndexedDB<T = any>(type: StoredData['type']): UseIndexedDBResult<T> {
  const [data, setData] = useState<StoredData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{ total: number; byStatus: { [key: string]: number } } | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Ensure DB is initialized
      await initDB();
      
      const [records, statistics] = await Promise.all([
        getAllData(type),
        getDataStats(type)
      ]);
      
      setData(records);
      setStats(statistics);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
      console.error('IndexedDB error:', err);
    } finally {
      setLoading(false);
    }
  }, [type]);

  const save = useCallback(async (newData: T, id?: string): Promise<string> => {
    try {
      setError(null);
      const savedId = await saveData(type, newData, id);
      await loadData(); // Refresh data after save
      return savedId;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save data';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [type, loadData]);

  const update = useCallback(async (id: string, newData: T): Promise<void> => {
    try {
      setError(null);
      await updateData(type, id, newData);
      await loadData(); // Refresh data after update
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update data';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [type, loadData]);

  const remove = useCallback(async (id: string): Promise<void> => {
    try {
      setError(null);
      await deleteData(type, id);
      await loadData(); // Refresh data after delete
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete data';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [type, loadData]);

  const getById = useCallback(async (id: string): Promise<StoredData | null> => {
    try {
      setError(null);
      return await getDataById(type, id);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get data by ID';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [type]);

  const search = useCallback(async (filters: { [key: string]: any }): Promise<StoredData[]> => {
    try {
      setError(null);
      return await searchData(type, filters);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search data';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [type]);

  const refresh = useCallback(async (): Promise<void> => {
    await loadData();
  }, [loadData]);

  const clear = useCallback(async (): Promise<void> => {
    try {
      setError(null);
      await dbService.clearAll(type);
      await loadData(); // Refresh data after clear
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to clear data';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [type, loadData]);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    data,
    loading,
    error,
    save,
    update,
    remove,
    getById,
    search,
    stats,
    refresh,
    clear
  };
}

// Specialized hooks for different data types
export const useConsultations = () => useIndexedDB<any>('consultation');
export const useServiceRequests = () => useIndexedDB<any>('service-request');
export const usePaymentRequests = () => useIndexedDB<any>('payment-request');
export const useServiceDeliveries = () => useIndexedDB<any>('service-delivery');
export const usePurchaseOrders = () => useIndexedDB<any>('purchase-order');
export const useInvoiceReceipts = () => useIndexedDB<any>('invoice-receipt');
export const useDocuments = () => useIndexedDB<any>('document');

// Hook for database initialization and global operations
export function useIndexedDBGlobal() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initialize = useCallback(async () => {
    try {
      await initDB();
      setIsInitialized(true);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize database');
      console.error('Database initialization error:', err);
    }
  }, []);

  const clearAllData = useCallback(async () => {
    try {
      await dbService.clearAll();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear all data');
      throw new Error(err instanceof Error ? err.message : 'Failed to clear all data');
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return {
    isInitialized,
    error,
    initialize,
    clearAllData
  };
}