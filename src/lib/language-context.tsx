"use client";

import React, { createContext, useContext, useState } from "react";
import { translations } from "./translations";

type Language = "ar" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ar");

  const t = (key: string, fallback?: string): string => {
    // If key contains '.', try to get from translations object
    if (key.includes('.')) {
      const keys = key.split(".");
      let value: any = translations[language];
      
      for (const k of keys) {
        value = value?.[k];
      }
      
      return value || fallback || key;
    }
    
    // Otherwise, use direct key lookup or return fallback
    const value = translations[language][key as keyof typeof translations[typeof language]];
    return value || fallback || key;
  };

  const isRTL = language === "ar";

  // Apply RTL to document when language changes (client-side only)
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.dir = isRTL ? "rtl" : "ltr";
      document.documentElement.lang = language;
    }
  }, [language, isRTL]);

  const value = {
    language,
    setLanguage,
    t,
    isRTL,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}