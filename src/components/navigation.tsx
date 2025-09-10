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
  Database,
  CheckCircle,
  Download,
  Bell,
  Users,
} from 'lucide-react';
import Link from 'next/link';

const navItems = [
  {
    href: '/dashboard',
    icon: LayoutDashboard,
    label: 'Dashboard',
    labelAr: 'لوحة التحكم',
    tooltip: 'Dashboard - لوحة التحكم',
  },
  {
    href: '/consultation',
    icon: MailQuestion,
    label: 'Consultation',
    labelAr: 'الاستشارة',
    tooltip: 'Consultation Request - إرسال إيميل استشارة',
  },
  {
    href: '/data-entry',
    icon: Database,
    label: 'Data Entry',
    labelAr: 'إدخال البيانات',
    tooltip: 'Data & Documents Entry - إدخال البيانات والوثائق',
  },
  {
    href: '/purchase-order',
    icon: ShoppingBasket,
    label: 'Purchase Order',
    labelAr: 'أمر الشراء',
    tooltip: 'Purchase Order Request - طلب أمر الشراء',
  },
  {
    href: '/service-request',
    icon: ClipboardList,
    label: 'Service Request',
    labelAr: 'طلب الخدمة',
    tooltip: 'Service Request - طلب الخدمة',
  },
  {
    href: '/service-delivery',
    icon: CheckCircle2,
    label: 'Service Delivery',
    labelAr: 'تسليم الخدمة',
    tooltip: 'Service Delivery Confirmation - تسليم الخدمة',
  },
  {
    href: '/invoice',
    icon: FileText,
    label: 'Invoice Receipt',
    labelAr: 'استلام الفاتورة',
    tooltip: 'Invoice Information Capture - استلام الفاتورة',
  },
  {
    href: '/payment-request',
    icon: Banknote,
    label: 'Payment Request',
    labelAr: 'طلب الدفع',
    tooltip: 'Payment Request - عمل طلب الدفع',
  },
  {
    href: '/payment-approval',
    icon: CheckCircle,
    label: 'Payment Approval',
    labelAr: 'موافقة الدفع',
    tooltip: 'Payment Approval - استلام موافقة الدفع',
  },
  {
    href: '/accounting',
    icon: Briefcase,
    label: 'Accounting',
    labelAr: 'المحاسبة',
    tooltip: 'Accounting - إرسال الملف للمحاسبة',
  },
  {
    href: '/reports',
    icon: Download,
    label: 'Reports',
    labelAr: 'التقارير',
    tooltip: 'Reports & Analytics - التقارير والتحليلات',
  },
  {
    href: '/notifications',
    icon: Bell,
    label: 'Notifications',
    labelAr: 'الإشعارات',
    tooltip: 'Notifications & Alerts - الإشعارات والتنبيهات',
  },
  {
    href: '/users',
    icon: Users,
    label: 'User Management',
    labelAr: 'إدارة المستخدمين',
    tooltip: 'User Management & Permissions - إدارة المستخدمين والصلاحيات',
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
                <div className="flex flex-col">
                  <span className="text-sm">{item.label}</span>
                  <span className="text-xs text-gray-500 font-normal">{item.labelAr}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarContent>
  );
}
