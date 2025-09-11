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
  Receipt, 
  Upload, 
  Calculator, 
  FileText, 
  Save, 
  Send, 
  Eye, 
  Download,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import { useToast } from "@/hooks/use-toast";
import { useMobile } from "@/hooks/use-mobile";

interface InvoiceReceiptData {
  receiptId: string;
  invoiceNumber: string;
  vendorName: string;
  vendorEmail: string;
  vendorPhone: string;
  invoiceDate: string;
  dueDate: string;
  totalAmount: number;
  taxAmount: number;
  netAmount: number;
  currency: string;
  paymentTerms: string;
  description: string;
  category: string;
  project: string;
  status: string;
  attachments: boolean;
  approvalRequired: boolean;
  notes: string;
}

const invoiceCategories = [
  "خدمات تقنية - Technical Services",
  "مستلزمات مكتبية - Office Supplies", 
  "معدات - Equipment",
  "صيانة - Maintenance",
  "استشارات - Consulting",
  "سفر وانتقالات - Travel & Transportation",
  "تسويق وإعلان - Marketing & Advertising",
  "أخرى - Others"
];

const sampleInvoices = [
  {
    id: 1,
    receiptId: "INV-REC-2024-001",
    invoiceNumber: "INV-001-2024",
    vendorName: "شركة التقنيات المتقدمة",
    totalAmount: 15750.00,
    status: "approved",
    invoiceDate: "2024-01-15",
    dueDate: "2024-02-14",
    category: "خدمات تقنية"
  },
  {
    id: 2,
    receiptId: "INV-REC-2024-002",
    invoiceNumber: "INV-002-2024",
    vendorName: "Advanced Solutions Ltd",
    totalAmount: 8900.00,
    status: "pending",
    invoiceDate: "2024-01-16",
    dueDate: "2024-02-15",
    category: "استشارات"
  },
  {
    id: 3,
    receiptId: "INV-REC-2024-003",
    invoiceNumber: "INV-003-2024",
    vendorName: "مؤسسة الخدمات الشاملة",
    totalAmount: 12300.00,
    status: "review",
    invoiceDate: "2024-01-14",
    dueDate: "2024-02-13",
    category: "صيانة"
  }
];

export default function InvoiceReceiptPage() {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const { isMobile } = useMobile();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<InvoiceReceiptData>({
    receiptId: `INV-REC-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
    invoiceNumber: "",
    vendorName: "",
    vendorEmail: "",
    vendorPhone: "",
    invoiceDate: "",
    dueDate: "",
    totalAmount: 0,
    taxAmount: 0,
    netAmount: 0,
    currency: "ILS",
    paymentTerms: "",
    description: "",
    category: "",
    project: "",
    status: "pending",
    attachments: false,
    approvalRequired: true,
    notes: ""
  });

  const handleInputChange = (field: keyof InvoiceReceiptData, value: string | number | boolean) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-calculate tax and net amount when total amount changes
      if (field === "totalAmount" && typeof value === "number") {
        const taxRate = 0.15; // 15% VAT
        const taxAmount = value * taxRate;
        const netAmount = value - taxAmount;
        updated.taxAmount = Math.round(taxAmount * 100) / 100;
        updated.netAmount = Math.round(netAmount * 100) / 100;
      }
      
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "تم حفظ استلام الفاتورة بنجاح",
        description: `رقم الاستلام: ${formData.receiptId}`,
      });
      
      // Reset form
      setFormData({
        receiptId: `INV-REC-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
        invoiceNumber: "",
        vendorName: "",
        vendorEmail: "",
        vendorPhone: "",
        invoiceDate: "",
        dueDate: "",
        totalAmount: 0,
        taxAmount: 0,
        netAmount: 0,
        currency: "ILS",
        paymentTerms: "",
        description: "",
        category: "",
        project: "",
        status: "pending",
        attachments: false,
        approvalRequired: true,
        notes: ""
      });
    } catch (error) {
      toast({
        title: "خطأ في حفظ الفاتورة",
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
        return <Badge variant="success">موافق عليها</Badge>;
      case "pending":
        return <Badge variant="pending">في الانتظار</Badge>;
      case "review":
        return <Badge variant="warning">قيد المراجعة</Badge>;
      case "rejected":
        return <Badge variant="destructive">مرفوضة</Badge>;
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
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Receipt className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{t("invoiceReceipt")}</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            الخطوة السادسة: استلام وإدخال بيانات الفاتورة
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Invoice Receipt Form */}
        <div className="lg:col-span-2">
          <Card className="mobile-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className={isMobile ? "truncate" : ""}>استلام فاتورة جديدة</span>
              </CardTitle>
              <CardDescription>
                أدخل تفاصيل الفاتورة المستلمة والمعلومات المالية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="mobile-form space-y-3 sm:space-y-4">
                {/* Receipt Information */}
                <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="receiptId">رقم الاستلام *</Label>
                    <Input
                      id="receiptId"
                      value={formData.receiptId}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="invoiceNumber">رقم الفاتورة *</Label>
                    <Input
                      id="invoiceNumber"
                      value={formData.invoiceNumber}
                      onChange={(e) => handleInputChange("invoiceNumber", e.target.value)}
                      placeholder="رقم الفاتورة من المورد"
                      required
                    />
                  </div>
                </div>

                {/* Vendor Information */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold">بيانات المورد</h3>
                  <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="vendorName">اسم المورد *</Label>
                      <Input
                        id="vendorName"
                        value={formData.vendorName}
                        onChange={(e) => handleInputChange("vendorName", e.target.value)}
                        placeholder="أدخل اسم المورد"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vendorEmail">البريد الإلكتروني</Label>
                      <Input
                        id="vendorEmail"
                        type="email"
                        value={formData.vendorEmail}
                        onChange={(e) => handleInputChange("vendorEmail", e.target.value)}
                        placeholder="vendor@example.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vendorPhone">رقم الهاتف</Label>
                    <Input
                      id="vendorPhone"
                      value={formData.vendorPhone}
                      onChange={(e) => handleInputChange("vendorPhone", e.target.value)}
                      placeholder="+966 50 123 4567"
                    />
                  </div>
                </div>

                {/* Invoice Details */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold">تفاصيل الفاتورة</h3>
                  <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="invoiceDate">تاريخ الفاتورة *</Label>
                      <Input
                        id="invoiceDate"
                        type="date"
                        value={formData.invoiceDate}
                        onChange={(e) => handleInputChange("invoiceDate", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dueDate">تاريخ الاستحقاق</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={formData.dueDate}
                        onChange={(e) => handleInputChange("dueDate", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">وصف الفاتورة *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="وصف الخدمات أو المنتجات المفوترة..."
                      className="min-h-[80px] sm:min-h-[100px]"
                      required
                    />
                  </div>
                </div>

                {/* Financial Information */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <Calculator className="h-4 w-4 sm:h-5 sm:w-5" />
                    المعلومات المالية
                  </h3>
                  <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="totalAmount">المبلغ الإجمالي *</Label>
                      <Input
                        id="totalAmount"
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.totalAmount}
                        onChange={(e) => handleInputChange("totalAmount", parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxAmount">الضريبة (15%)</Label>
                      <Input
                        id="taxAmount"
                        type="number"
                        value={formData.taxAmount}
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="netAmount">المبلغ الصافي</Label>
                      <Input
                        id="netAmount"
                        type="number"
                        value={formData.netAmount}
                        readOnly
                        className="bg-muted"
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
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
                      <Label htmlFor="paymentTerms">شروط الدفع</Label>
                      <Select value={formData.paymentTerms} onValueChange={(value) => handleInputChange("paymentTerms", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر شروط الدفع" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="net15">صافي 15 يوم</SelectItem>
                          <SelectItem value="net30">صافي 30 يوم</SelectItem>
                          <SelectItem value="net60">صافي 60 يوم</SelectItem>
                          <SelectItem value="immediate">فوري</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Categorization */}
                <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">فئة الفاتورة *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الفئة" />
                      </SelectTrigger>
                      <SelectContent>
                        {invoiceCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
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

                {/* File Attachments */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold">المرفقات</h3>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 sm:p-6 text-center">
                    <Upload className="h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      اسحب وأفلت ملف الفاتورة هنا أو انقر لاختيار الملف
                    </p>
                    <Button type="button" variant="outline" className="mobile-button">
                      <Upload className="h-4 w-4 mr-2" />
                      اختر الملف
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      الملفات المدعومة: PDF, JPG, PNG (أقصى حجم: 10MB)
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">ملاحظات إضافية</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="أي ملاحظات إضافية حول الفاتورة..."
                    className="min-h-[80px] sm:min-h-[100px]"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" className="mobile-button order-3 sm:order-1">
                    <Save className="h-4 w-4 mr-2" />
                    حفظ مسودة
                  </Button>
                  <Button type="button" variant="outline" className="mobile-button order-2">
                    إلغاء
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="mobile-button order-1 sm:order-3">
                    {isSubmitting ? (
                      <>
                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                        جاري الحفظ...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        إرسال للمراجعة
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Invoice History */}
        <div>
          <Card className="mobile-card">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">الفواتير المستلمة</CardTitle>
              <CardDescription>
                آخر الفواتير المسجلة في النظام
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {sampleInvoices.map((invoice) => (
                <div key={invoice.id} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 border rounded-lg">
                  {getStatusIcon(invoice.status)}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-xs sm:text-sm truncate">
                      {invoice.receiptId}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {invoice.invoiceNumber}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {isMobile ? invoice.vendorName.substring(0, 20) + '...' : invoice.vendorName}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {getStatusBadge(invoice.status)}
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs sm:text-sm font-semibold text-primary">
                        {formatCurrency(invoice.totalAmount, "ILS", "ar")}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {invoice.invoiceDate}
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

          {/* Invoice Stats */}
          <Card className="mobile-card mt-4 sm:mt-6">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">إحصائيات الفواتير</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm">إجمالي الفواتير</span>
                <span className="font-semibold">{sampleInvoices.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm">موافق عليها</span>
                <span className="font-semibold text-green-600">
                  {sampleInvoices.filter(i => i.status === 'approved').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm">قيد المراجعة</span>
                <span className="font-semibold text-blue-600">
                  {sampleInvoices.filter(i => i.status === 'review').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm">إجمالي القيمة</span>
                <span className="font-semibold text-primary">
                  {formatCurrency(sampleInvoices.reduce((sum, i) => sum + i.totalAmount, 0), "ILS", "ar")}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}