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
import { useMobile } from "@/hooks/use-mobile";
import { 
  useConsultations,
  useServiceRequests,
  usePurchaseOrders,
  useServiceDeliveries,
  useInvoiceReceipts,
  usePaymentRequests
} from "@/hooks/use-indexeddb";
import { useAppState } from "@/hooks/use-indexeddb";
import dbService from "@/lib/indexeddb";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

type StepStatus = "completed" | "current" | "pending";
type Step = {
  id: number;
  name: string;
  href: string;
  icon: any;
  status: StepStatus;
  description: string;
  completedAt: string | null;
};

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
  const { isMobile } = useMobile();
  const { stats: consultationsStats } = useConsultations();
  const { stats: serviceRequestsStats } = useServiceRequests();
  const { stats: purchaseOrdersStats } = usePurchaseOrders();
  const { stats: serviceDeliveriesStats } = useServiceDeliveries();
  const { stats: invoiceReceiptsStats } = useInvoiceReceipts();
  const { stats: paymentRequestsStats } = usePaymentRequests();
  const { value: currentStepId, set: setCurrentStep } = useAppState<number>("currentStepId");
  const { toast } = useToast();
  const [history, setHistory] = useState<{ stepId: number; at: string }[]>([]);
  const [lastChangedAt, setLastChangedAt] = useState<string | null>(null);
  const IDLE_THRESHOLD_MS = 4 * 60 * 60 * 1000; // 4 hours

  const loadHistory = useCallback(async () => {
    await dbService.init();
    const h = (await dbService.getAppState<{ stepId: number; at: string }[]>("currentStepHistory")) || [];
    const changedAt = (await dbService.getAppState<string>("currentStepChangedAt")) || null;
    setHistory(h);
    setLastChangedAt(changedAt);
  }, []);
  
  const baseSteps: Omit<Step, "status">[] = [
    { id: 1, name: "consultation", href: "/consultation", icon: Mail, description: "إرسال إيميل استشارة للعميل", completedAt: null },
    { id: 2, name: "dataEntry", href: "/data-entry", icon: FileText, description: "إدخال البيانات والوثائق المطلوبة", completedAt: null },
    { id: 3, name: "purchaseOrder", href: "/purchase-order", icon: ShoppingCart, description: "تقديم طلب أمر الشراء", completedAt: null },
    { id: 4, name: "serviceRequest", href: "/service-request", icon: Settings, description: "تقديم طلب الخدمة المحددة", completedAt: null },
    { id: 5, name: "serviceDelivery", href: "/service-delivery", icon: Truck, description: "تأكيد تسليم الخدمة للعميل", completedAt: null },
    { id: 6, name: "invoiceReceipt", href: "/invoice-receipt", icon: Receipt, description: "استلام وإدخال بيانات الفاتورة", completedAt: null },
    { id: 7, name: "paymentRequest", href: "/payment-request", icon: CreditCard, description: "تقديم طلب صرف دفعة مالية", completedAt: null },
    { id: 8, name: "paymentApproval", href: "/payment-approval", icon: CheckCircle, description: "انتظار موافقة الدفع", completedAt: null },
    { id: 9, name: "accountingTransfer", href: "/accounting-transfer", icon: Send, description: "إرسال الملف لقسم المحاسبة", completedAt: null },
  ];
  
  const totalsByStepId: Record<number, number> = {
    1: consultationsStats?.total || 0,
    2: 0, // data-entry page may store multiple types; keep as progress-only step
    3: purchaseOrdersStats?.total || 0,
    4: serviceRequestsStats?.total || 0,
    5: serviceDeliveriesStats?.total || 0,
    6: invoiceReceiptsStats?.total || 0,
    7: paymentRequestsStats?.total || 0,
    8: 0,
    9: 0,
  };
  
  const computedSteps: Step[] = baseSteps.map((s) => ({
    ...s,
    status: "pending",
  }));
  
  // Mark steps as completed where there is persisted data
  for (const step of computedSteps) {
    if ((totalsByStepId[step.id] || 0) > 0) {
      step.status = "completed";
    }
  }
  
  // Determine current step as the first non-completed step
  const firstPendingIndex = computedSteps.findIndex((s) => s.status !== "completed");
  if (firstPendingIndex !== -1) {
    computedSteps[firstPendingIndex].status = "current";
  }
  
  const completedSteps = computedSteps.filter(step => step.status === "completed").length;
  const progressPercentage = (completedSteps / computedSteps.length) * 100;
  let currentStep = computedSteps.find(s => s.status === "current");
  if (currentStepId) {
    const manual = computedSteps.find((s) => s.id === currentStepId);
    if (manual) currentStep = manual;
  }

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  // Idle reminder toast
  useEffect(() => {
    const interval = setInterval(() => {
      if (!currentStep) return;
      const ts = lastChangedAt || (history[0]?.at ?? null);
      if (!ts) return;
      const elapsed = Date.now() - new Date(ts).getTime();
      if (elapsed > IDLE_THRESHOLD_MS) {
        toast({
          title: "تذكير بالمهمة الحالية",
          description: `مرت ${Math.floor(elapsed / (60 * 60 * 1000))} ساعة على المهمة: ${t(currentStep.name)}`,
        });
      }
    }, 60 * 1000);
    return () => clearInterval(interval);
  }, [currentStep, lastChangedAt, history, toast, t]);

  const handleSetCurrent = useCallback(async (stepId: number) => {
    const now = new Date().toISOString();
    await setCurrentStep(stepId);
    await dbService.setAppState("currentStepChangedAt", now);
    const prev = (await dbService.getAppState<{ stepId: number; at: string }[]>("currentStepHistory")) || [];
    const updated = [{ stepId, at: now }, ...prev].slice(0, 20);
    await dbService.setAppState("currentStepHistory", updated);
    setHistory(updated);
    setLastChangedAt(now);
  }, [setCurrentStep]);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{t("dashboard")}</h1>
          <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
            نظام إدارة سير العمل - تتبع ومراقبة جميع العمليات
          </p>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="mobile-card">
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
            <span className="truncate">تقدم سير العمل - Workflow Progress</span>
          </CardTitle>
          <CardDescription className="text-sm">
            مراحل العمل المكتملة: {completedSteps} من {computedSteps.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm">
                {currentStep ? (
                  <span>
                    تابع من حيث توقفت: <strong>{t(currentStep.name)}</strong>
                  </span>
                ) : (
                  <span>لا توجد مهمة حالية</span>
                )}
              </div>
              {currentStep && (
                <Link href={currentStep.href}>
                  <Button size="sm" className="mobile-button">متابعة</Button>
                </Link>
              )}
            </div>
            {/* Inner reset button removed as per request */}
            <Progress value={progressPercentage} className="h-2 sm:h-3" />
            <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
              <span>البداية</span>
              <span>{Math.round(progressPercentage)}% مكتمل</span>
              <span>النهاية</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Workflow Steps */}
      <div className="grid gap-3 sm:gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold">خطوات سير العمل - Workflow Steps</h2>
        
        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {computedSteps.map((step, index) => {
            const Icon = step.icon;
            const StatusIcon = getStatusIcon(step.status);
            
            return (
              <Card key={step.id} className={`
                mobile-card transition-all hover:shadow-md
                ${step.status === "current" ? "ring-1 sm:ring-2 ring-primary" : ""}
                ${step.status === "completed" ? "bg-green-50 border-green-200" : ""}
              `}>
                <CardHeader className="pb-2 sm:pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                      <span className="text-xs sm:text-sm font-medium">خطوة {step.id}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusIcon className={`h-3 w-3 sm:h-4 sm:w-4 ${
                        step.status === "completed" ? "text-green-500" :
                        step.status === "current" ? "text-blue-500" :
                        "text-gray-400"
                      }`} />
                      <Badge variant={getStatusVariant(step.status)} className="text-xs px-1 py-0 sm:px-2">
                        {step.status === "completed" ? "مكتمل" :
                         step.status === "current" ? "جاري" : "معلق"}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-base sm:text-lg">{t(step.name)}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 space-y-2">
                  <CardDescription className="mb-1 sm:mb-2 text-sm">
                    {isMobile ? step.description.substring(0, 50) + '...' : step.description}
                  </CardDescription>
                  
                  {step.completedAt && (
                    <p className="text-xs text-green-600 mb-2 sm:mb-3">
                      مكتمل في: {step.completedAt}
                    </p>
                  )}
                  
                  <div className="flex gap-2">
                    <Link href={step.href}>
                      <Button 
                        className="mobile-button"
                        variant={step.status === "current" ? "default" : "outline"}
                        size={isMobile ? "default" : "sm"}
                      >
                        {step.status === "completed" ? "عرض" :
                         step.status === "current" ? "متابعة" : "ابدأ"}
                      </Button>
                    </Link>
                    <Button
                      type="button"
                      variant="secondary"
                      size={isMobile ? "default" : "sm"}
                      onClick={() => handleSetCurrent(step.id)}
                    >
                      اجعلها الحالية
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      {/* Current step history */}
      <div className="grid gap-3 sm:gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold">سجل تغيّر المهمة الحالية</h2>
        <Card className="mobile-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base sm:text-lg">آخر تغييرات</CardTitle>
            <CardDescription>يتم حفظ آخر 20 تغييراً</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {history.length === 0 ? (
              <p className="text-sm text-muted-foreground">لا يوجد سجل حتى الآن</p>
            ) : (
              history.map((h, idx) => (
                <div key={`${h.stepId}-${h.at}-${idx}`} className="flex items-center justify-between text-sm p-2 border rounded-md">
                  <span>{t(computedSteps.find(s => s.id === h.stepId)?.name || 'خطوة')}</span>
                  <span className="text-muted-foreground">{new Date(h.at).toLocaleString('ar-SA')}</span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-4">
        <Card className="mobile-card">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium truncate">المهام المكتملة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-green-600">{completedSteps}</div>
            <p className="text-xs text-muted-foreground">من أصل {computedSteps.length}</p>
          </CardContent>
        </Card>
        
        <Card className="mobile-card">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium truncate">المهام المعلقة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-orange-600">
              {computedSteps.filter(s => s.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">في الانتظار</p>
          </CardContent>
        </Card>
        
        <Card className="mobile-card">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium truncate">المهمة الحالية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-blue-600">
              {currentStep ? t(currentStep.name) : "لا توجد مهمة حالية"}
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {currentStep ? currentStep.description : "لا توجد مهمة حالية"}
            </p>
          </CardContent>
        </Card>
        
        <Card className="mobile-card">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium truncate">نسبة الإنجاز</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-primary">
              {Math.round(progressPercentage)}%
            </div>
            <p className="text-xs text-muted-foreground">مكتمل</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}