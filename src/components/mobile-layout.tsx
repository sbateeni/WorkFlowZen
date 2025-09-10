"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Navigation } from "@/components/navigation";
import { useLanguage } from "@/hooks/use-language";
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
            onItemClick={() => isMobile && setSidebarOpen(false)} 
          />
        </div>
      ) : (
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col lg:border-r lg:bg-background">
          <Navigation />
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
}"