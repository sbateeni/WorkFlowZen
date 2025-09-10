"use client";

import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function LanguageSwitcher() {
  const { language, setLanguage, isRTL } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "ar" ? "en" : "ar");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2"
    >
      <Languages className="h-4 w-4" />
      <span className="text-sm">
        {language === "ar" ? "English" : "العربية"}
      </span>
    </Button>
  );
}