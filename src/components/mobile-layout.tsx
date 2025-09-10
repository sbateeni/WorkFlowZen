"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { useLanguage } from "@/lib/language-context";
import { useMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface MobileLayoutProps {
  children: React.ReactNode;
}

export function MobileLayout({ children }: MobileLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isRTL } = useLanguage();
  const { isMobile } = useMobile();

  return (
    <div className={cn("min-h-screen bg-background", isRTL && "rtl")}>
      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className={cn(
            "fixed inset-0 z-40 bg-black/50 transition-opacity",
            isRTL ? "animate-in fade-in" : "animate-in fade-in"
          )}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      {isMobile ? (
        <div className={cn(
          "fixed inset-y-0 z-50 w-64 transform bg-background border-r transition-transform duration-200 ease-in-out",
          isRTL ? "right-0" : "left-0",
          sidebarOpen ? "translate-x-0" : isRTL ? "translate-x-full" : "-translate-x-full"
        )}>
          <div className={cn("flex h-16 items-center justify-between px-4 border-b", isRTL && "flex-row-reverse")}>
            <h1 className={cn("text-xl font-bold text-primary", isMobile && "text-lg")}>
              WorkFlowZen
            </h1>
            {isMobile && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "p-2 hover:bg-accent",
                  isRTL ? "mr-2" : "ml-2"
                )}
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>
          <Navigation 
            className="flex-1 px-2 py-4 space-y-1" 
            onItemClick={() => isMobile && setSidebarOpen(false)} 
          />
        </div>
      ) : (
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:bg-background">
          <Navigation className="flex-1 px-2 py-4 space-y-1" />
        </div>
      )}

      {/* Main content */}
      <div className={cn(
        "flex flex-col",
        !isMobile && "lg:pl-64",
        isRTL && !isMobile && "lg:pr-64 lg:pl-0"
      )}>
        {/* Mobile header */}
        {isMobile && (
          <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center border-b bg-background px-4 shadow-sm">
            <div className={cn("flex items-center gap-x-4 lg:gap-x-6", isRTL && "flex-row-reverse")}>
              {isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 hover:bg-accent"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              )}
              <h1 className={cn(
                "text-xl font-bold text-primary", 
                isMobile ? "text-lg truncate" : "text-2xl"
              )}>
                WorkFlowZen
              </h1>
            </div>
          </header>
        )}

        {/* Page content */}
        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

import { useState } from \"react\";
import { Navigation } from \"@/components/navigation\";
import { UserNav } from \"@/components/user-nav\";
import { LanguageSwitcher } from \"@/components/language-switcher\";
import { useMobile } from \"@/hooks/use-mobile\";
import { useLanguage } from \"@/lib/language-context\";
import { Button } from \"@/components/ui/button\";
import { Menu, X } from \"lucide-react\";

interface MobileLayoutProps {
  children: React.ReactNode;
}

export function MobileLayout({ children }: MobileLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isMobile } = useMobile();
  const { isRTL } = useLanguage();

  return (
    <div className=\"flex h-screen bg-gray-100\">
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className=\"fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity\"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        sidebar fixed inset-y-0 z-50 bg-white shadow-lg transition-transform duration-300 ease-in-out
        ${isMobile ? 'w-80' : 'w-64'}
        ${isMobile && !sidebarOpen ? (isRTL ? 'translate-x-full' : '-translate-x-full') : 'translate-x-0'}
        ${isRTL ? 'right-0' : 'left-0'}
      `}>
        <div className=\"flex h-full flex-col\">
          {/* Logo & Mobile Close Button */}
          <div className=\"flex h-16 items-center justify-between border-b px-4 sm:px-6\">
            <h1 className=\"text-lg sm:text-xl font-bold text-primary truncate\">WorkFlowZen</h1>
            {isMobile && (
              <Button
                variant=\"ghost\"
                size=\"sm\"
                onClick={() => setSidebarOpen(false)}
                className=\"mobile-button\"
              >
                <X className=\"h-5 w-5\" />
              </Button>
            )}
          </div>
          
          {/* Navigation */}
          <div className=\"flex-1 overflow-y-auto mobile-scroll px-2 sm:px-4 py-4 sm:py-6\">
            <Navigation onItemClick={() => isMobile && setSidebarOpen(false)} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`
        main-content flex-1 flex flex-col min-h-0
        ${!isMobile ? (isRTL ? 'mr-64' : 'ml-64') : ''}
      `}>
        {/* Top Bar */}
        <header className=\"flex h-14 sm:h-16 items-center justify-between border-b bg-white px-3 sm:px-6 flex-shrink-0\">
          <div className=\"flex items-center space-x-2 sm:space-x-4\">
            {/* Mobile Menu Button */}
            {isMobile && (
              <Button
                variant=\"ghost\"
                size=\"sm\"
                onClick={() => setSidebarOpen(true)}
                className=\"mobile-button mr-2\"
              >
                <Menu className=\"h-5 w-5\" />
              </Button>
            )}
            <h2 className=\"text-sm sm:text-lg font-semibold truncate\">
              {isMobile ? \"WorkFlowZen\" : \"لوحة التحكم - Dashboard\"}
            </h2>
          </div>
          
          <div className=\"flex items-center space-x-2 sm:space-x-4\">
            <LanguageSwitcher />
            <UserNav />
          </div>
        </header>

        {/* Page Content */}
        <main className=\"flex-1 overflow-y-auto mobile-scroll\">
          <div className=\"mobile-optimized py-4 sm:py-6\">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}"