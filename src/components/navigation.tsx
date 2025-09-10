"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Mail, 
  FileText, 
  ShoppingCart, 
  Settings, 
  Truck, 
  Receipt, 
  CreditCard, 
  CheckCircle, 
  Send,
  LayoutDashboard
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

const navigationItems = [
  {
    name: "dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    step: 0,
  },
  {
    name: "consultation",
    href: "/consultation",
    icon: Mail,
    step: 1,
  },
  {
    name: "dataEntry",
    href: "/data-entry",
    icon: FileText,
    step: 2,
  },
  {
    name: "purchaseOrder",
    href: "/purchase-order",
    icon: ShoppingCart,
    step: 3,
  },
  {
    name: "serviceRequest",
    href: "/service-request",
    icon: Settings,
    step: 4,
  },
  {
    name: "serviceDelivery",
    href: "/service-delivery",
    icon: Truck,
    step: 5,
  },
  {
    name: "invoiceReceipt",
    href: "/invoice-receipt",
    icon: Receipt,
    step: 6,
  },
  {
    name: "paymentRequest",
    href: "/payment-request",
    icon: CreditCard,
    step: 7,
  },
  {
    name: "paymentApproval",
    href: "/payment-approval",
    icon: CheckCircle,
    step: 8,
  },
  {
    name: "accountingTransfer",
    href: "/accounting-transfer",
    icon: Send,
    step: 9,
  },
];

export function Navigation() {
  const pathname = usePathname();
  const { t, isRTL } = useLanguage();

  return (
    <nav className="space-y-2">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              isRTL && "flex-row-reverse"
            )}
          >
            <Icon className="h-4 w-4" />
            <span className="flex-1">
              {item.step > 0 && (
                <span className={cn(
                  "text-xs font-normal opacity-70 ml-2",
                  isRTL && "mr-2 ml-0"
                )}>
                  {item.step}.
                </span>
              )}
              {t(item.name)}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}