import { 
  Mail, 
  FileText, 
  ShoppingCart, 
  Settings, 
  Truck, 
  Receipt, 
  CreditCard, 
  CheckCircle, 
  Send
} from "lucide-react";
import { DashboardClient } from "@/components/dashboard-client";

const workflowSteps = [
  {
    id: 1,
    name: "consultation",
    href: "/consultation",
    icon: Mail,
    status: "completed",
    description: "إرسال إيميل استشارة للعميل",
    completedAt: "2024-01-15",
  },
  {
    id: 2,
    name: "dataEntry",
    href: "/data-entry",
    icon: FileText,
    status: "current",
    description: "إدخال البيانات والوثائق المطلوبة",
    completedAt: null,
  },
  {
    id: 3,
    name: "purchaseOrder",
    href: "/purchase-order",
    icon: ShoppingCart,
    status: "pending",
    description: "تقديم طلب أمر الشراء",
    completedAt: null,
  },
  {
    id: 4,
    name: "serviceRequest",
    href: "/service-request",
    icon: Settings,
    status: "pending",
    description: "تقديم طلب الخدمة المحددة",
    completedAt: null,
  },
  {
    id: 5,
    name: "serviceDelivery",
    href: "/service-delivery",
    icon: Truck,
    status: "pending",
    description: "تأكيد تسليم الخدمة للعميل",
    completedAt: null,
  },
  {
    id: 6,
    name: "invoiceReceipt",
    href: "/invoice-receipt",
    icon: Receipt,
    status: "pending",
    description: "استلام وإدخال بيانات الفاتورة",
    completedAt: null,
  },
  {
    id: 7,
    name: "paymentRequest",
    href: "/payment-request",
    icon: CreditCard,
    status: "pending",
    description: "تقديم طلب صرف دفعة مالية",
    completedAt: null,
  },
  {
    id: 8,
    name: "paymentApproval",
    href: "/payment-approval",
    icon: CheckCircle,
    status: "pending",
    description: "انتظار موافقة الدفع",
    completedAt: null,
  },
  {
    id: 9,
    name: "accountingTransfer",
    href: "/accounting-transfer",
    icon: Send,
    status: "pending",
    description: "إرسال الملف لقسم المحاسبة",
    completedAt: null,
  },
];



export default function DashboardPage() {
  return <DashboardClient workflowSteps={workflowSteps} />;
}