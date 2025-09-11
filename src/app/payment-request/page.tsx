"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  CreditCard, 
  Calculator, 
  FileText, 
  Upload, 
  Send, 
  Clock, 
  CheckCircle,
  AlertCircle,
  DollarSign,
  Eye,
  Download,
  Building,
  User
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import { useToast } from "@/hooks/use-toast";
import { useMobile } from "@/hooks/use-mobile";

interface PaymentRequestData {
  requestId: string;
  invoiceReference: string;
  payeeName: string;
  payeeType: string;
  paymentMethod: string;
  bankName: string;
  accountNumber: string;
  iban: string;
  amount: number;
  currency: string;
  paymentDate: string;
  urgency: string;
  purpose: string;
  category: string;
  project: string;
  approver: string;
  requiresApproval: boolean;
  supportingDocuments: boolean;
  taxDeductible: boolean;
  notes: string;
}

const paymentMethods = [
  "تحويل بنكي - Bank Transfer",
  "شيك - Check",
  "دفع نقدي - Cash Payment",
  "بطاقة ائتمان - Credit Card",
  "محفظة إلكترونية - E-Wallet"
];

const urgencyLevels = [
  { value: "urgent", label: "عاجل - خلال 24 ساعة", color: "destructive" },
  { value: "high", label: "عالي - خلال 3 أيام", color: "warning" },
  { value: "normal", label: "عادي - خلال أسبوع", color: "secondary" },
  { value: "low", label: "منخفض - خلال شهر", color: "outline" }
];

const samplePaymentRequests = [
  {
    id: 1,
    requestId: "PAY-REQ-2024-001",
    payeeName: "شركة التقنيات المتقدمة",
    amount: 15750.00,
    status: "approved",
    paymentDate: "2024-01-20",
    urgency: "normal",
    purpose: "فاتورة خدمات تقنية"
  },
  {
    id: 2,
    requestId: "PAY-REQ-2024-002",
    payeeName: "Advanced Solutions Ltd",
    amount: 8900.00,
    status: "pending",
    paymentDate: "2024-01-22",
    urgency: "high",
    purpose: "استشارات تقنية"
  },
  {
    id: 3,
    requestId: "PAY-REQ-2024-003",
    payeeName: "محمد أحمد - مطور",
    amount: 5200.00,
    status: "review",
    paymentDate: "2024-01-25",
    urgency: "urgent",
    purpose: "راتب شهري"
  }
];

export default function PaymentRequestPage() {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const { isMobile } = useMobile();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<PaymentRequestData>({
    requestId: `PAY-REQ-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
    invoiceReference: "",
    payeeName: "",
    payeeType: "",
    paymentMethod: "",
    bankName: "",
    accountNumber: "",
    iban: "",
    amount: 0,
    currency: "ILS",
    paymentDate: "",
    urgency: "normal",
    purpose: "",
    category: "",
    project: "",
    approver: "",
    requiresApproval: true,
    supportingDocuments: false,
    taxDeductible: false,
    notes: ""
  });

  const handleInputChange = (field: keyof PaymentRequestData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "تم إرسال طلب الدفع بنجاح",
        description: `رقم الطلب: ${formData.requestId}`,
      });
      
      // Reset form
      setFormData({
        requestId: `PAY-REQ-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
        invoiceReference: "",
        payeeName: "",
        payeeType: "",
        paymentMethod: "",
        bankName: "",
        accountNumber: "",
        iban: "",
        amount: 0,
        currency: "ILS",
        paymentDate: "",
        urgency: "normal",
        purpose: "",
        category: "",
        project: "",
        approver: "",
        requiresApproval: true,
        supportingDocuments: false,
        taxDeductible: false,
        notes: ""
      });
    } catch (error) {
      toast({
        title: "خطأ في إرسال طلب الدفع",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge variant="success">موافق عليه</Badge>;
      case "pending":
        return <Badge variant="pending">في الانتظار</Badge>;
      case "review":
        return <Badge variant="warning">قيد المراجعة</Badge>;
      case "rejected":
        return <Badge variant="destructive">مرفوض</Badge>;
      case "paid":
        return <Badge variant="success">تم الدفع</Badge>;
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
      case "review":
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case "rejected":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "paid":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    const urgencyObj = urgencyLevels.find(u => u.value === urgency);
    if (!urgencyObj) return <Badge variant="secondary">{urgency}</Badge>;
    
    return <Badge variant={urgencyObj.color as any}>{urgencyObj.label.split(' - ')[0]}</Badge>;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <CreditCard className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{t("paymentRequest")}</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            الخطوة السابعة: تقديم طلب صرف دفعة مالية
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Payment Request Form */}
        <div className="lg:col-span-2">
          <Card className="mobile-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className={isMobile ? "truncate" : ""}>طلب دفع جديد</span>
              </CardTitle>
              <CardDescription>
                أدخل البيانات التي تريد مشاركتها لإنشاء طلب دفع جديد
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="mobile-form space-y-3 sm:space-y-4">
                {/* Request Information */}
                <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="requestId">رقم طلب الدفع</Label>
                    <Input
                      id="requestId"
                      value={formData.requestId}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="invoiceReference">مرجع الفاتورة</Label>
                    <Input
                      id="invoiceReference"
                      value={formData.invoiceReference}
                      onChange={(e) => handleInputChange("invoiceReference", e.target.value)}
                      placeholder="INV-REC-2024-XXX"
                    />
                  </div>
                </div>

                {/* Payee Information */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <User className="h-4 w-4 sm:h-5 sm:w-5" />
                    بيانات المستفيد
                  </h3>
                  <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="payeeName">اسم المستفيد</Label>
                      <Input
                        id="payeeName"
                        value={formData.payeeName}
                        onChange={(e) => handleInputChange("payeeName", e.target.value)}
                        placeholder="أدخل اسم المستفيد"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="payeeType">نوع المستفيد</Label>
                      <Select value={formData.payeeType} onValueChange={(value) => handleInputChange("payeeType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نوع المستفيد" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">فرد</SelectItem>
                          <SelectItem value="company">شركة</SelectItem>
                          <SelectItem value="vendor">مورد</SelectItem>
                          <SelectItem value="employee">موظف</SelectItem>
                          <SelectItem value="contractor">متعاقد</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Banking Information */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <Building className="h-4 w-4 sm:h-5 sm:w-5" />
                    المعلومات البنكية
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod">طريقة الدفع</Label>
                    <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange("paymentMethod", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر طريقة الدفع" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentMethods.map((method) => (
                          <SelectItem key={method} value={method}>
                            {method}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {formData.paymentMethod && formData.paymentMethod.includes("Bank Transfer") && (
                    <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="bankName">اسم البنك</Label>
                        <Input
                          id="bankName"
                          value={formData.bankName}
                          onChange={(e) => handleInputChange("bankName", e.target.value)}
                          placeholder="أدخل اسم البنك"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="accountNumber">رقم الحساب</Label>
                        <Input
                          id="accountNumber"
                          value={formData.accountNumber}
                          onChange={(e) => handleInputChange("accountNumber", e.target.value)}
                          placeholder="رقم الحساب البنكي"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="iban">رقم الآيبان (IBAN)</Label>
                        <Input
                          id="iban"
                          value={formData.iban}
                          onChange={(e) => handleInputChange("iban", e.target.value)}
                          placeholder="SA00 0000 0000 0000 0000 0000"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Payment Details */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <Calculator className="h-4 w-4 sm:h-5 sm:w-5" />
                    تفاصيل الدفع
                  </h3>
                  <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="amount">المبلغ</Label>
                      <Input
                        id="amount"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.amount}
                        onChange={(e) => handleInputChange("amount", parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">العملة</Label>
                      <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر العملة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ILS">شيكل (ILS)</SelectItem>
                          <SelectItem value="USD">دولار أمريكي (USD)</SelectItem>
                          <SelectItem value="EUR">يورو (EUR)</SelectItem>
                          <SelectItem value="AED">درهم إماراتي (AED)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paymentDate">تاريخ الدفع المطلوب</Label>
                      <Input
                        id="paymentDate"
                        type="date"
                        value={formData.paymentDate}
                        onChange={(e) => handleInputChange("paymentDate", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="urgency">درجة الأولوية</Label>
                    <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر درجة الأولوية" />
                      </SelectTrigger>
                      <SelectContent>
                        {urgencyLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="purpose">الغرض من الدفع</Label>
                    <Textarea
                      id="purpose"
                      value={formData.purpose}
                      onChange={(e) => handleInputChange("purpose", e.target.value)}
                      placeholder="اشرح الغرض من الدفع والخدمات أو المنتجات المدفوع لأجلها..."
                      className="min-h-[80px] sm:min-h-[100px]"
                    />
                  </div>
                </div>

                {/* Categorization */}
                <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">فئة الدفع</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الفئة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="operational">تشغيلية</SelectItem>
                        <SelectItem value="salaries">رواتب</SelectItem>
                        <SelectItem value="utilities">مرافق</SelectItem>
                        <SelectItem value="marketing">تسويق</SelectItem>
                        <SelectItem value="equipment">معدات</SelectItem>
                        <SelectItem value="services">خدمات</SelectItem>
                        <SelectItem value="other">أخرى</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="project">المشروع المرتبط</Label>
                    <Input
                      id="project"
                      value={formData.project}
                      onChange={(e) => handleInputChange("project", e.target.value)}
                      placeholder="اسم المشروع (اختياري)"
                    />
                  </div>
                </div>

                {/* Approval Information */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold">معلومات الموافقة</h3>
                  <div className="space-y-2">
                    <Label htmlFor="approver">المسؤول عن الموافقة</Label>
                    <Select value={formData.approver} onValueChange={(value) => handleInputChange("approver", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المسؤول" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="finance_manager">مدير الشؤون المالية</SelectItem>
                        <SelectItem value="general_manager">المدير العام</SelectItem>
                        <SelectItem value="ceo">الرئيس التنفيذي</SelectItem>
                        <SelectItem value="department_head">رئيس القسم</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox
                        id="supportingDocuments"
                        checked={formData.supportingDocuments}
                        onCheckedChange={(checked: boolean) => handleInputChange("supportingDocuments", checked)}
                      />
                      <Label htmlFor="supportingDocuments" className="text-sm font-normal cursor-pointer">
                        تم إرفاق المستندات الداعمة
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox
                        id="taxDeductible"
                        checked={formData.taxDeductible}
                        onCheckedChange={(checked: boolean) => handleInputChange("taxDeductible", checked)}
                      />
                      <Label htmlFor="taxDeductible" className="text-sm font-normal cursor-pointer">
                        قابل للخصم الضريبي
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">ملاحظات إضافية</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="أي ملاحظات إضافية حول طلب الدفع..."
                    className="min-h-[80px] sm:min-h-[100px]"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" className="mobile-button order-2 sm:order-1">
                    إلغاء
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="mobile-button order-1 sm:order-2">
                    {isSubmitting ? (
                      <>
                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        إرسال طلب الدفع
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Payment Request History */}
        <div>
          <Card className="mobile-card">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">طلبات الدفع السابقة</CardTitle>
              <CardDescription>
                آخر طلبات الدفع المرسلة
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {samplePaymentRequests.map((request) => (
                <div key={request.id} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 border rounded-lg">
                  {getStatusIcon(request.status)}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-xs sm:text-sm truncate">
                      {request.requestId}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {isMobile ? request.payeeName.substring(0, 20) + '...' : request.payeeName}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {isMobile ? request.purpose.substring(0, 25) + '...' : request.purpose}
                    </p>
                    <div className="flex items-center gap-1 sm:gap-2 mt-2 flex-wrap">
                      {getStatusBadge(request.status)}
                      {getUrgencyBadge(request.urgency)}
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs sm:text-sm font-semibold text-primary">
                        {formatCurrency(request.amount, "ILS", "ar")}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {request.paymentDate}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <Button variant="ghost" size="sm" className="mobile-button p-1 sm:p-2">
                      <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="mobile-button p-1 sm:p-2">
                      <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Payment Stats */}
          <Card className="mobile-card mt-4 sm:mt-6">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">إحصائيات الدفع</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm">إجمالي الطلبات</span>
                <span className="font-semibold">{samplePaymentRequests.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm">موافق عليها</span>
                <span className="font-semibold text-green-600">
                  {samplePaymentRequests.filter(r => r.status === 'approved').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm">قيد المراجعة</span>
                <span className="font-semibold text-blue-600">
                  {samplePaymentRequests.filter(r => r.status === 'review').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm">إجمالي المبالغ</span>
                <span className="font-semibold text-primary">
                  {formatCurrency(samplePaymentRequests.reduce((sum, r) => sum + r.amount, 0), "ILS", "ar")}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}