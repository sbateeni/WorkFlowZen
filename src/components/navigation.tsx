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
import { useMobile } from "@/hooks/use-mobile";

interface NavigationProps {
  onItemClick?: () => void;
}

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

export function Navigation({ onItemClick }: NavigationProps) {
  const pathname = usePathname();
  const { t, isRTL } = useLanguage();
  const { isMobile } = useMobile();

  return (
    <nav className="space-y-1 sm:space-y-2">
      {navigationItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onItemClick}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors mobile-button",
              "hover:bg-accent hover:text-accent-foreground",
              "focus:bg-accent focus:text-accent-foreground focus:outline-none",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground",
              isRTL && "flex-row-reverse",
              isMobile && "py-3 text-base" // Larger touch targets on mobile
            )}
          >
            <Icon className={cn("h-4 w-4 flex-shrink-0", isMobile && "h-5 w-5")} />
            <div className="flex-1 min-w-0">
              {item.step > 0 && (
                <span className={cn(
                  "text-xs font-normal opacity-70",
                  isRTL ? "mr-2 ml-0" : "ml-2 mr-0",
                  isMobile && "text-sm"
                )}>
                  {item.step}.
                </span>
              )}
              <span className="truncate">{t(item.name)}</span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}                  {item.step}.
                </span>
              )}
              <span className="truncate">{t(item.name)}</span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}