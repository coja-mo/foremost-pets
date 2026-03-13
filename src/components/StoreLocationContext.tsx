'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { STORE_LOCATIONS } from '@/lib/store-config';

type StoreLocation = (typeof STORE_LOCATIONS)[number];

interface StoreLocationContextType {
  currentStore: StoreLocation;
  allStores: readonly StoreLocation[];
  setStoreById: (id: string) => void;
  isOpen: () => boolean;
  todayHours: () => { open: string; close: string; isClosed: boolean };
}

const StoreLocationContext = createContext<StoreLocationContextType | null>(null);

export function StoreLocationProvider({ children }: { children: React.ReactNode }) {
  const [selectedId, setSelectedId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('fp-selected-store') || STORE_LOCATIONS[0].id;
    }
    return STORE_LOCATIONS[0].id;
  });

  const currentStore = STORE_LOCATIONS.find(s => s.id === selectedId) || STORE_LOCATIONS[0];

  const setStoreById = useCallback((id: string) => {
    setSelectedId(id);
    if (typeof window !== 'undefined') {
      localStorage.setItem('fp-selected-store', id);
    }
  }, []);

  const isOpen = useCallback(() => {
    const now = new Date();
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;
    const today = days[now.getDay()];
    const hours = currentStore.hours[today];
    if (hours.isClosed) return false;
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const [openH, openM] = hours.open.split(':').map(Number);
    const [closeH, closeM] = hours.close.split(':').map(Number);
    return currentMinutes >= openH * 60 + openM && currentMinutes < closeH * 60 + closeM;
  }, [currentStore]);

  const todayHours = useCallback(() => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;
    const today = days[new Date().getDay()];
    return currentStore.hours[today];
  }, [currentStore]);

  return (
    <StoreLocationContext.Provider value={{
      currentStore,
      allStores: STORE_LOCATIONS,
      setStoreById,
      isOpen,
      todayHours,
    }}>
      {children}
    </StoreLocationContext.Provider>
  );
}

export function useStoreLocation() {
  const ctx = useContext(StoreLocationContext);
  if (!ctx) throw new Error('useStoreLocation must be used within StoreLocationProvider');
  return ctx;
}
