"use client";

import React from "react";
import { LanguageProvider } from "@/lib/language-context";
import { DatabaseProvider } from "@/components/providers/database-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <DatabaseProvider>
        {children}
      </DatabaseProvider>
    </LanguageProvider>
  );
}


