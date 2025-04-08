
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { debts, parties, currencies, transactions, userStats } from './mock-data';
import { useToast } from '@/hooks/use-toast';
import { toast } from '@/components/ui/sonner';

type AppContextType = {
  language: 'en' | 'vn';
  currencies: typeof currencies;
  selectedCurrency: string;
  isDarkMode: boolean;
  isSidebarOpen: boolean;
  debts: typeof debts;
  parties: typeof parties;
  transactions: typeof transactions;
  userStats: typeof userStats;
  setLanguage: (lang: 'en' | 'vn') => void;
  setSelectedCurrency: (currency: string) => void;
  setIsDarkMode: (isDark: boolean) => void;
  setIsSidebarOpen: (isOpen: boolean) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'vn'>('en');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Effect for handling theme changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Effect for handling language changes
  useEffect(() => {
    // In a real app, this would update all text across the application
    toast(`Language changed to ${language === 'en' ? 'English' : 'Vietnamese'}`);
  }, [language]);

  // Effect for handling currency changes
  useEffect(() => {
    toast(`Currency changed to ${selectedCurrency}`);
  }, [selectedCurrency]);

  const value = {
    language,
    currencies,
    selectedCurrency,
    isDarkMode,
    isSidebarOpen,
    debts,
    parties,
    transactions,
    userStats,
    setLanguage,
    setSelectedCurrency,
    setIsDarkMode,
    setIsSidebarOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
