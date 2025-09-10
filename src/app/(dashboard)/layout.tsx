import { Navigation } from "@/components/navigation";
import { UserNav } from "@/components/user-nav";
import { LanguageSwitcher } from "@/components/language-switcher";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="sidebar fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-center border-b px-6">
            <h1 className="text-xl font-bold text-primary">WorkFlowZen</h1>
          </div>
          
          {/* Navigation */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <Navigation />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content flex-1 ml-64">
        {/* Top Bar */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold">لوحة التحكم - Dashboard</h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <UserNav />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}