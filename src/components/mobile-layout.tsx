"use client";

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