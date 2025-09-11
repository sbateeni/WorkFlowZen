"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Bell, 
  Send, 
  Eye,
  MessageSquare,
  User,
  Calendar,
  DollarSign,
  FileText,
  AlertTriangle,
  Mail,
  Phone
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useToast } from "@/hooks/use-toast";
import { useMobile } from "@/hooks/use-mobile";

interface PaymentApprovalData {
  approvalId: string;
  paymentRequestId: string;
  requestedBy: string;
  payeeName: string;
  amount: number;
  currency: string;
  submissionDate: string;
  urgency: string;
  purpose: string;
  status: string;
  approver: string;
  approvalDate: string;
  rejectionReason: string;
  comments: string;
  notificationSent: boolean;
  documentReview: boolean;
}

const approvalActions = [
  { value: "approve", label: "موافقة - Approve", icon: CheckCircle, color: "success" },
  { value: "reject", label: "رفض - Reject", icon: XCircle, color: "destructive" },
  { value: "request_info", label: "طلب معلومات إضافية", icon: MessageSquare, color: "warning" },
  { value: "defer", label: "تأجيل القرار", icon: Clock, color: "secondary" }
];

const notificationChannels = [
  { value: "email", label: "البريد الإلكتروني", icon: Mail },
  { value: "sms", label: "رسالة نصية", icon: Phone },
  { value: "system", label: "إشعار النظام", icon: Bell },
  { value: "all", label: "جميع القنوات", icon: Send }
];

const sampleApprovals = [
  {
    id: 1,
    approvalId: "APR-2024-001",
    paymentRequestId: "PAY-REQ-2024-001",
    requestedBy: "أحمد محمد",
    payeeName: "شركة التقنيات المتقدمة",
    amount: 15750.00,
    status: "pending",
    urgency: "normal",
    submissionDate: "2024-01-20",
    purpose: "فاتورة خدمات تقنية"
  },
  {
    id: 2,
    approvalId: "APR-2024-002", 
    paymentRequestId: "PAY-REQ-2024-002",
    requestedBy: "سارة أحمد",
    payeeName: "Advanced Solutions Ltd",
    amount: 8900.00,
    status: "approved",
    urgency: "high",
    submissionDate: "2024-01-22",
    purpose: "استشارات تقنية"
  },
  {
    id: 3,
    approvalId: "APR-2024-003",
    paymentRequestId: "PAY-REQ-2024-003", 
    requestedBy: "محمد علي",
    payeeName: "مطور مستقل",
    amount: 5200.00,
    status: "rejected",
    urgency: "urgent",
    submissionDate: "2024-01-25",
    purpose: "أتعاب برمجة"
  }
];

export default function PaymentApprovalPage() {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const { isMobile } = useMobile();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState<typeof sampleApprovals[0] | null>(null);
  const [formData, setFormData] = useState<PaymentApprovalData>({
    approvalId: "",
    paymentRequestId: "",
    requestedBy: "",
    payeeName: "",
    amount: 0,
    currency: "ILS",
    submissionDate: "",
    urgency: "",
    purpose: "",
    status: "pending",
    approver: "",
    approvalDate: "",
    rejectionReason: "",
    comments: "",
    notificationSent: false,
    documentReview: false
  });

  const handleInputChange = (field: keyof PaymentApprovalData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleApprovalAction = async (action: string) => {
    if (!selectedApproval) {
      toast({
        title: "خطأ",
        description: "يرجى اختيار طلب دفع للمراجعة",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const actionLabels = {
        approve: "تمت الموافقة على",
        reject: "تم رفض", 
        request_info: "تم طلب معلومات إضافية لـ",
        defer: "تم تأجيل"
      };

      toast({
        title: "تم تنفيذ الإجراء بنجاح",
        description: `${actionLabels[action as keyof typeof actionLabels]} طلب الدفع ${selectedApproval.paymentRequestId}`,
      });

      // Send notification
      await sendNotification(selectedApproval, action);
      
      // Reset form
      setSelectedApproval(null);
      setFormData({
        approvalId: "",
        paymentRequestId: "",
        requestedBy: "",
        payeeName: "",
        amount: 0,
        currency: "ILS",
        submissionDate: "",
        urgency: "",
        purpose: "",
        status: "pending",
        approver: "",
        approvalDate: "",
        rejectionReason: "",
        comments: "",
        notificationSent: false,
        documentReview: false
      });
    } catch (error) {
      toast({
        title: "خطأ في تنفيذ الإجراء",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const sendNotification = async (approval: any, action: string) => {
    // Simulate notification sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "تم إرسال الإشعارات",
      description: `تم إشعار ${approval.requestedBy} بقرار ${action === 'approve' ? 'الموافقة' : action === 'reject' ? 'الرفض' : 'المراجعة'}`,
    });
  };

  const selectApprovalForReview = (approval: any) => {
    setSelectedApproval(approval);
    setFormData({
      approvalId: approval.approvalId,
      paymentRequestId: approval.paymentRequestId,
      requestedBy: approval.requestedBy,
      payeeName: approval.payeeName,
      amount: approval.amount,
      currency: "ILS",
      submissionDate: approval.submissionDate,
      urgency: approval.urgency,
      purpose: approval.purpose,
      status: approval.status,
      approver: "مدير الشؤون المالية",
      approvalDate: new Date().toISOString().split('T')[0],
      rejectionReason: "",
      comments: "",
      notificationSent: false,
      documentReview: false
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge variant="success">موافق عليه</Badge>;
      case "pending":
        return <Badge variant="pending">في الانتظار</Badge>;
      case "rejected":
        return <Badge variant="destructive">مرفوض</Badge>;
      case "info_requested":
        return <Badge variant="warning">معلومات مطلوبة</Badge>;
      case "deferred":
        return <Badge variant="secondary">مؤجل</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-orange-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "info_requested":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "deferred":
        return <Clock className="h-4 w-4 text-gray-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "urgent":
        return <Badge variant="destructive">عاجل</Badge>;
      case "high":
        return <Badge variant="warning">عالي</Badge>;
      case "normal":
        return <Badge variant="secondary">عادي</Badge>;
      case "low":
        return <Badge variant="outline">منخفض</Badge>;
      default:
        return <Badge variant="secondary">{urgency}</Badge>;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{t("paymentApproval")}</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            الخطوة الثامنة: مراجعة والموافقة على طلبات الدفع
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Approval Review Panel */}
        <div className="lg:col-span-2">
          {!selectedApproval ? (
            <Card className="mobile-card">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">طلبات الدفع المعلقة</CardTitle>
                <CardDescription>
                  اختر طلب دفع للمراجعة والموافقة عليه
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {sampleApprovals.filter(a => a.status === 'pending').map((approval) => (
                    <div key={approval.id} className="flex items-center gap-3 p-3 sm:p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                         onClick={() => selectApprovalForReview(approval)}>
                      <div className="flex flex-col items-center gap-1">
                        {getStatusIcon(approval.status)}
                        {getUrgencyBadge(approval.urgency)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {approval.paymentRequestId}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          المستفيد: {approval.payeeName}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          الغرض: {isMobile ? approval.purpose.substring(0, 30) + '...' : approval.purpose}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          طالب الدفع: {approval.requestedBy} • {approval.submissionDate}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">
                          {approval.amount.toFixed(2)} ₪
                        </p>
                        <Button variant="outline" size="sm" className="mobile-button mt-2">
                          <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          مراجعة
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  {sampleApprovals.filter(a => a.status === 'pending').length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>لا توجد طلبات دفع معلقة للمراجعة</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="mobile-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className={isMobile ? "truncate" : ""}>مراجعة طلب الدفع</span>
                </CardTitle>
                <CardDescription>
                  مراجعة تفاصيل طلب الدفع واتخاذ قرار الموافقة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mobile-form space-y-3 sm:space-y-4">
                  {/* Request Details */}
                  <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>رقم طلب الدفع</Label>
                      <Input value={formData.paymentRequestId} readOnly className="bg-muted" />
                    </div>
                    <div className="space-y-2">
                      <Label>رقم الموافقة</Label>
                      <Input value={formData.approvalId} readOnly className="bg-muted" />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>طالب الدفع</Label>
                      <Input value={formData.requestedBy} readOnly className="bg-muted" />
                    </div>
                    <div className="space-y-2">
                      <Label>المستفيد</Label>
                      <Input value={formData.payeeName} readOnly className="bg-muted" />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label>المبلغ</Label>
                      <Input value={`${formData.amount.toFixed(2)} ${formData.currency}`} readOnly className="bg-muted" />
                    </div>
                    <div className="space-y-2">
                      <Label>الأولوية</Label>
                      <div className="h-10 flex items-center">
                        {getUrgencyBadge(formData.urgency)}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>تاريخ التقديم</Label>
                      <Input value={formData.submissionDate} readOnly className="bg-muted" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>الغرض من الدفع</Label>
                    <Textarea value={formData.purpose} readOnly className="bg-muted min-h-[80px]" />
                  </div>

                  {/* Approval Section */}
                  <div className="space-y-3 sm:space-y-4 border-t pt-4">
                    <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                      <User className="h-4 w-4 sm:h-5 sm:w-5" />
                      قرار الموافقة
                    </h3>
                    
                    <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="approver">المسؤول عن الموافقة</Label>
                        <Input
                          id="approver"
                          value={formData.approver}
                          onChange={(e) => handleInputChange("approver", e.target.value)}
                          placeholder="اسم المسؤول"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="approvalDate">تاريخ الموافقة</Label>
                        <Input
                          id="approvalDate"
                          type="date"
                          value={formData.approvalDate}
                          onChange={(e) => handleInputChange("approvalDate", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="comments">تعليقات وملاحظات</Label>
                      <Textarea
                        id="comments"
                        value={formData.comments}
                        onChange={(e) => handleInputChange("comments", e.target.value)}
                        placeholder="أضف أي تعليقات أو ملاحظات حول القرار..."
                        className="min-h-[80px] sm:min-h-[100px]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rejectionReason">سبب الرفض (في حالة الرفض)</Label>
                      <Textarea
                        id="rejectionReason"
                        value={formData.rejectionReason}
                        onChange={(e) => handleInputChange("rejectionReason", e.target.value)}
                        placeholder="اشرح سبب رفض طلب الدفع..."
                        className="min-h-[80px] sm:min-h-[100px]"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-4">
                    {approvalActions.map((action) => {
                      const Icon = action.icon;
                      return (
                        <Button
                          key={action.value}
                          variant={action.color === 'success' ? 'default' : 
                                   action.color === 'destructive' ? 'destructive' : 'outline'}
                          className="mobile-button flex-1 sm:flex-none"
                          onClick={() => handleApprovalAction(action.value)}
                          disabled={isProcessing}
                        >
                          <Icon className="h-4 w-4 mr-2" />
                          {action.label.split(' - ')[0]}
                        </Button>
                      );
                    })}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      className="mobile-button flex-1"
                      onClick={() => setSelectedApproval(null)}
                    >
                      عودة للقائمة
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Approval History & Stats */}
        <div>
          <Card className="mobile-card">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">جميع الطلبات</CardTitle>
              <CardDescription>
                تاريخ طلبات الدفع والموافقات
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {sampleApprovals.map((approval) => (
                <div key={approval.id} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 border rounded-lg">
                  {getStatusIcon(approval.status)}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-xs sm:text-sm truncate">
                      {approval.paymentRequestId}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {isMobile ? approval.payeeName.substring(0, 20) + '...' : approval.payeeName}
                    </p>
                    <div className="flex items-center gap-1 sm:gap-2 mt-2 flex-wrap">
                      {getStatusBadge(approval.status)}
                      {getUrgencyBadge(approval.urgency)}
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs sm:text-sm font-semibold text-primary">
                        {approval.amount.toFixed(2)} ₪
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {approval.submissionDate}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Approval Stats */}
          <Card className="mobile-card mt-4 sm:mt-6">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">إحصائيات الموافقات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm">إجمالي الطلبات</span>
                <span className="font-semibold">{sampleApprovals.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm">موافق عليها</span>
                <span className="font-semibold text-green-600">
                  {sampleApprovals.filter(a => a.status === 'approved').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm">مرفوضة</span>
                <span className="font-semibold text-red-600">
                  {sampleApprovals.filter(a => a.status === 'rejected').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm">في الانتظار</span>
                <span className="font-semibold text-orange-600">
                  {sampleApprovals.filter(a => a.status === 'pending').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm">إجمالي المبالغ</span>
                <span className="font-semibold text-primary">
                  {sampleApprovals.reduce((sum, a) => sum + a.amount, 0).toFixed(2)} ₪
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Notification Panel */}
          <Card className="mobile-card mt-4 sm:mt-6">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                <Bell className="h-4 w-4" />
                الإشعارات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-xs sm:text-sm text-muted-foreground">
                سيتم إرسال إشعارات تلقائية للمتقدمين بالطلبات عند اتخاذ القرارات
              </div>
              <div className="flex flex-wrap gap-1">
                {notificationChannels.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <Badge key={channel.value} variant="outline" className="text-xs">
                      <Icon className="h-3 w-3 mr-1" />
                      {channel.label}
                    </Badge>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}