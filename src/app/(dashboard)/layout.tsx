import { Navigation } from '@/components/navigation';
import { UserNav } from '@/components/user-nav';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Zap } from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar>
        <div className="flex h-full flex-col">
          <div className="border-b border-sidebar-border p-3">
            <Button
              variant="ghost"
              className="h-10 w-full justify-start gap-3 px-2 text-lg font-bold"
              asChild
            >
              <Link href="/dashboard">
                <Zap className="h-8 w-8 text-primary" />
                <span className="group-data-[collapsible=icon]:hidden">
                  WorkFlowZen
                </span>
              </Link>
            </Button>
          </div>
          <Navigation />
        </div>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 p-4 backdrop-blur-sm sm:justify-end">
          <SidebarTrigger className="sm:hidden" />
          <UserNav />
        </header>
        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </>
  );
}
