"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
  ArrowRight,
  Clock,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

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

const getStatusVariant = (status: string) => {
  switch (status) {
    case "completed":
      return "success";
    case "current":
      return "pending";
    case "pending":
      return "secondary";
    default:
      return "secondary";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return CheckCircle;
    case "current":
      return Clock;
    case "pending":
      return AlertCircle;
    default:
      return AlertCircle;
  }
};

export default function DashboardPage() {
  const { t, isRTL } = useLanguage();
  
  const completedSteps = workflowSteps.filter(step => step.status === "completed").length;
  const progressPercentage = (completedSteps / workflowSteps.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t("dashboard")}</h1>
          <p className="text-muted-foreground mt-2">
            نظام إدارة سير العمل - تتبع ومراقبة جميع العمليات
          </p>
        </div>
      </div>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            تقدم سير العمل - Workflow Progress
          </CardTitle>
          <CardDescription>
            مراحل العمل المكتملة: {completedSteps} من {workflowSteps.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={progressPercentage} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>البداية</span>
              <span>{Math.round(progressPercentage)}% مكتمل</span>
              <span>النهاية</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workflow Steps */}
      <div className="grid gap-4">
        <h2 className="text-2xl font-semibold">خطوات سير العمل - Workflow Steps</h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;
            const StatusIcon = getStatusIcon(step.status);
            
            return (
              <Card key={step.id} className={`
                transition-all hover:shadow-md
                ${step.status === "current" ? "ring-2 ring-primary" : ""}
                ${step.status === "completed" ? "bg-green-50 border-green-200" : ""}
              `}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium">خطوة {step.id}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusIcon className={`h-4 w-4 ${
                        step.status === "completed" ? "text-green-500" :
                        step.status === "current" ? "text-blue-500" :
                        "text-gray-400"
                      }`} />
                      <Badge variant={getStatusVariant(step.status)} className="text-xs">
                        {step.status === "completed" ? "مكتمل" :
                         step.status === "current" ? "جاري" : "معلق"}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{t(step.name)}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="mb-4">
                    {step.description}
                  </CardDescription>
                  
                  {step.completedAt && (
                    <p className="text-xs text-green-600 mb-3">
                      مكتمل في: {step.completedAt}
                    </p>
                  )}
                  
                  <Link href={step.href}>
                    <Button 
                      className="w-full" 
                      variant={step.status === "current" ? "default" : "outline"}
                      size="sm"
                    >
                      {step.status === "completed" ? "عرض" : 
                       step.status === "current" ? "متابعة" : "ابدأ"}
                      <ArrowRight className={`h-4 w-4 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`} />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">المهام المكتملة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedSteps}</div>
            <p className="text-xs text-muted-foreground">من أصل {workflowSteps.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">المهام المعلقة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {workflowSteps.filter(s => s.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">في الانتظار</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">المهمة الحالية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">2</div>
            <p className="text-xs text-muted-foreground">إدخال البيانات</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">نسبة الإنجاز</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {Math.round(progressPercentage)}%
            </div>
            <p className="text-xs text-muted-foreground">مكتمل</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}