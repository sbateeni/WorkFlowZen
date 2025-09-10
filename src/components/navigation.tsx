'use client';
import { usePathname } from 'next/navigation';
import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  Banknote,
  Briefcase,
  CheckCircle2,
  ClipboardList,
  FileText,
  LayoutDashboard,
  MailQuestion,
  ShoppingBasket,
} from 'lucide-react';
import Link from 'next/link';

const navItems = [
  {
    href: '/dashboard',
    icon: LayoutDashboard,
    label: 'Dashboard',
    tooltip: 'Dashboard',
  },
  {
    href: '/consultation',
    icon: MailQuestion,
    label: 'Consultation',
    tooltip: 'Consultation Request',
  },
  {
    href: '/purchase-order',
    icon: ShoppingBasket,
    label: 'Purchase Order',
    tooltip: 'Purchase Order Request',
  },
  {
    href: '/service-request',
    icon: ClipboardList,
    label: 'Service Request',
    tooltip: 'Service Request',
  },
  {
    href: '/service-delivery',
    icon: CheckCircle2,
    label: 'Service Delivery',
    tooltip: 'Service Delivery Confirmation',
  },
  {
    href: '/invoice',
    icon: FileText,
    label: 'Invoice Capture',
    tooltip: 'Invoice Information Capture',
  },
  {
    href: '/payment-request',
    icon: Banknote,
    label: 'Payment Request',
    tooltip: 'Payment Request',
  },
  {
    href: '/accounting',
    icon: Briefcase,
    label: 'Accounting',
    tooltip: 'Accounting',
  },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <SidebarContent className="p-2">
      <SidebarMenu>
        {navItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              tooltip={{
                children: item.tooltip,
              }}
            >
              <Link href={item.href}>
                <item.icon />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarContent>
  );
}
