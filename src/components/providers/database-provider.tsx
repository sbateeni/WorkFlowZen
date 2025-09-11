"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { useIndexedDBGlobal } from '@/hooks/use-indexeddb';

interface DatabaseContextType {
  isInitialized: boolean;
  error: string | null;
  clearAllData: () => Promise<void>;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const { isInitialized, error, clearAllData } = useIndexedDBGlobal();

  return (
    <DatabaseContext.Provider value={{ isInitialized, error, clearAllData }}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
}