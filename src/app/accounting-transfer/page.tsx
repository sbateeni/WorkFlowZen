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
  Send, 
  Upload, 
  Download, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Archive,
  Server,
  Shield,
  Eye,
  Trash2,
  RefreshCw,
  Building,
  Calendar
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useToast } from "@/hooks/use-toast";
import { useMobile } from "@/hooks/use-mobile";

interface AccountingTransferData {
  transferId: string;
  batchNumber: string;
  transferDate: string;
  accountingPeriod: string;
  department: string;
  totalRecords: number;
  totalAmount: number;
  currency: string;
  transferMethod: string;
  systemDestination: string;
  encryptionEnabled: boolean;
  backupCreated: boolean;
  validationPassed: boolean;
  approvalRequired: boolean;
  transferredBy: string;
  status: string;
  completionTime: string;
  errorLog: string;
  notes: string;
  includedDocuments: string[];
}

const transferMethods = [
  { value: "sftp", label: "نقل آمن عبر SFTP", icon: Shield },
  { value: "api", label: "واجهة برمجية API", icon: Server },
  { value: "export", label: "تصدير ملف Excel/CSV", icon: Download },
  { value: "manual", label: "نقل يدوي", icon: Upload }
];

const accountingSystems = [
  "SAP ERP",
  "Oracle Financials", 
  "Microsoft Dynamics",
  "QuickBooks Enterprise",
  "Sage 300",
  "نظام محاسبي مخصص"
];

const documentTypes = [
  "طلبات الدفع المعتمدة",
  "الفواتير المستلمة", 
  "أوامر الشراء",
  "تقارير الخدمات",
  "وثائق التسليم",
  "إثباتات الدفع",
  "المراسلات المالية"
];

const sampleTransfers = [
  {
    id: 1,
    transferId: "ACC-TRF-2024-001",
    batchNumber: "BATCH-2024-01-001",
    department: "الشؤون المالية",
    totalRecords: 45,
    totalAmount: 125750.00,
    status: "completed",
    transferDate: "2024-01-20",
    transferMethod: "sftp",
    systemDestination: "SAP ERP"
  },
  {
    id: 2,
    transferId: "ACC-TRF-2024-002",
    batchNumber: "BATCH-2024-01-002", 
    department: "المشتريات",
    totalRecords: 23,
    totalAmount: 89300.00,
    status: "in_progress",
    transferDate: "2024-01-22",
    transferMethod: "api",
    systemDestination: "Oracle Financials"
  },
  {
    id: 3,
    transferId: "ACC-TRF-2024-003",
    batchNumber: "BATCH-2024-01-003",
    department: "الخدمات",
    totalRecords: 67,
    totalAmount: 203100.00,
    status: "failed",
    transferDate: "2024-01-25",
    transferMethod: "sftp",
    systemDestination: "Microsoft Dynamics"
  }
];

export default function AccountingTransferPage() {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const { isMobile } = useMobile();
  const [isTransferring, setIsTransferring] = useState(false);
  const [formData, setFormData] = useState<AccountingTransferData>({
    transferId: `ACC-TRF-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
    batchNumber: `BATCH-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(Date.now()).slice(-3)}`,
    transferDate: new Date().toISOString().split('T')[0],
    accountingPeriod: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`,
    department: "",
    totalRecords: 0,
    totalAmount: 0,
    currency: "SAR",
    transferMethod: "",
    systemDestination: "",
    encryptionEnabled: true,
    backupCreated: false,
    validationPassed: false,
    approvalRequired: true,
    transferredBy: "",
    status: "pending",
    completionTime: "",
    errorLog: "",
    notes: "",
    includedDocuments: []
  });

  const handleInputChange = (field: keyof AccountingTransferData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDocumentToggle = (document: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      includedDocuments: checked 
        ? [...prev.includedDocuments, document]
        : prev.includedDocuments.filter(d => d !== document)
    }));
  };

  const handleTransfer = async () => {
    if (!formData.transferMethod || !formData.systemDestination) {
      toast({
        title: "بيانات غير مكتملة",
        description: "يرجى اختيار طريقة النقل والنظام المحاسبي",
        variant: "destructive"
      });
      return;
    }

    setIsTransferring(true);

    try {
      // Simulate validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormData(prev => ({ ...prev, validationPassed: true }));
      
      // Simulate backup creation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFormData(prev => ({ ...prev, backupCreated: true }));
      
      // Simulate transfer
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const now = new Date();
      setFormData(prev => ({ 
        ...prev, 
        status: "completed",
        completionTime: now.toLocaleTimeString('ar-SA')
      }));
      
      toast({
        title: "تم نقل الملفات بنجاح",
        description: `تم نقل ${formData.totalRecords} سجل إلى ${formData.systemDestination}`,
      });

    } catch (error) {
      setFormData(prev => ({ 
        ...prev, 
        status: "failed",
        errorLog: "خطأ في الاتصال بالنظام المحاسبي"
      }));
      
      toast({
        title: "فشل في نقل الملفات",
        description: "يرجى مراجعة الإعدادات والمحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsTransferring(false);
    }
  };

  const generateTransferReport = () => {
    // Simulate report generation
    toast({
      title: "تم إنشاء التقرير",
      description: "تقرير النقل جاهز للتحميل",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="success">مكتمل</Badge>;
      case "in_progress":
        return <Badge variant="pending">قيد النقل</Badge>;
      case "failed":
        return <Badge variant="destructive">فشل</Badge>;
      case "pending":
        return <Badge variant="secondary">في الانتظار</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in_progress":
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-orange-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getMethodIcon = (method: string) => {
    const methodObj = transferMethods.find(m => m.value === method);
    if (methodObj) {
      const Icon = methodObj.icon;
      return <Icon className="h-4 w-4" />;
    }
    return <FileText className="h-4 w-4" />;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Send className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{t("accountingTransfer")}</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            الخطوة التاسعة: إرسال الملفات لقسم المحاسبة
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Transfer Configuration */}
        <div className="lg:col-span-2">
          <Card className="mobile-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Archive className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className={isMobile ? "truncate" : ""}>إعداد نقل المحاسبة</span>
              </CardTitle>
              <CardDescription>
                قم بتكوين عملية نقل الملفات المالية للنظام المحاسبي
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mobile-form space-y-3 sm:space-y-4">
                {/* Transfer Information */}
                <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="transferId">رقم عملية النقل</Label>
                    <Input
                      id="transferId"
                      value={formData.transferId}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="batchNumber">رقم المجموعة</Label>
                    <Input
                      id="batchNumber"
                      value={formData.batchNumber}
                      onChange={(e) => handleInputChange("batchNumber", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="transferDate">تاريخ النقل</Label>
                    <Input
                      id="transferDate"
                      type="date"
                      value={formData.transferDate}
                      onChange={(e) => handleInputChange("transferDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accountingPeriod">الفترة المحاسبية</Label>
                    <Input
                      id="accountingPeriod"
                      value={formData.accountingPeriod}
                      onChange={(e) => handleInputChange("accountingPeriod", e.target.value)}
                      placeholder="YYYY-MM"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">القسم</Label>
                    <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر القسم" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="finance">الشؤون المالية</SelectItem>
                        <SelectItem value="procurement">المشتريات</SelectItem>
                        <SelectItem value="services">الخدمات</SelectItem>
                        <SelectItem value="hr">الموارد البشرية</SelectItem>
                        <SelectItem value="operations">العمليات</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Transfer Configuration */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <Server className="h-4 w-4 sm:h-5 sm:w-5" />
                    إعدادات النقل
                  </h3>
                  
                  <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="transferMethod">طريقة النقل</Label>
                      <Select value={formData.transferMethod} onValueChange={(value) => handleInputChange("transferMethod", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر طريقة النقل" />
                        </SelectTrigger>
                        <SelectContent>
                          {transferMethods.map((method) => (
                            <SelectItem key={method.value} value={method.value}>
                              <div className="flex items-center gap-2">
                                <method.icon className="h-4 w-4" />
                                {method.label}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="systemDestination">النظام المحاسبي</Label>
                      <Select value={formData.systemDestination} onValueChange={(value) => handleInputChange("systemDestination", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر النظام" />
                        </SelectTrigger>
                        <SelectContent>
                          {accountingSystems.map((system) => (
                            <SelectItem key={system} value={system}>
                              {system}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transferredBy">المسؤول عن النقل</Label>
                    <Input
                      id="transferredBy"
                      value={formData.transferredBy}
                      onChange={(e) => handleInputChange("transferredBy", e.target.value)}
                      placeholder="اسم المسؤول"
                    />
                  </div>
                </div>

                {/* Document Selection */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold">الوثائق المضمنة</h3>
                  <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2">
                    {documentTypes.map((document) => (
                      <div key={document} className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox
                          id={document}
                          checked={formData.includedDocuments.includes(document)}
                          onCheckedChange={(checked) => 
                            handleDocumentToggle(document, checked as boolean)
                          }
                        />
                        <Label 
                          htmlFor={document} 
                          className="text-xs sm:text-sm font-normal cursor-pointer"
                        >
                          {document}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security & Validation */}  
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                    الأمان والتحقق
                  </h3>
                  
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox
                        id="encryptionEnabled"
                        checked={formData.encryptionEnabled}
                        onCheckedChange={(checked) => handleInputChange("encryptionEnabled", checked as boolean)}
                      />
                      <Label htmlFor="encryptionEnabled" className="text-sm font-normal cursor-pointer">
                        تشفير الملفات قبل النقل
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox
                        id="backupCreated"
                        checked={formData.backupCreated}
                        disabled
                      />
                      <Label htmlFor="backupCreated" className="text-sm font-normal">
                        إنشاء نسخة احتياطية {formData.backupCreated && "✓"}
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox
                        id="validationPassed"
                        checked={formData.validationPassed}
                        disabled
                      />
                      <Label htmlFor="validationPassed" className="text-sm font-normal">
                        اجتياز التحقق من البيانات {formData.validationPassed && "✓"}
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Transfer Summary */}
                {formData.includedDocuments.length > 0 && (
                  <div className="space-y-3 sm:space-y-4 border-t pt-4">
                    <h3 className="text-base sm:text-lg font-semibold">ملخص النقل</h3>
                    <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label>عدد السجلات</Label>
                        <Input
                          type="number"
                          value={formData.totalRecords}
                          onChange={(e) => handleInputChange("totalRecords", parseInt(e.target.value) || 0)}
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>إجمالي المبلغ</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={formData.totalAmount}
                          onChange={(e) => handleInputChange("totalAmount", parseFloat(e.target.value) || 0)}
                          placeholder="0.00"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>العملة</Label>
                        <Select value={formData.currency} onValueChange={(value) => handleInputChange("currency", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="SAR">ريال سعودي</SelectItem>
                            <SelectItem value="USD">دولار أمريكي</SelectItem>
                            <SelectItem value="EUR">يورو</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="notes">ملاحظات</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="أي ملاحظات إضافية حول عملية النقل..."
                    className="min-h-[80px] sm:min-h-[100px]"
                  />
                </div>

                {/* Transfer Status */}
                {formData.status !== "pending" && (
                  <div className="space-y-2 border-t pt-4">
                    <div className="flex items-center gap-2">
                      <Label>حالة النقل:</Label>
                      {getStatusBadge(formData.status)}
                    </div>
                    {formData.completionTime && (
                      <p className="text-sm text-muted-foreground">
                        وقت الإنجاز: {formData.completionTime}
                      </p>
                    )}
                    {formData.errorLog && (
                      <div className="p-3 bg-destructive/10 rounded-lg">
                        <p className="text-sm text-destructive font-medium">خطأ:</p>
                        <p className="text-sm text-destructive">{formData.errorLog}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 pt-4">
                  <Button 
                    onClick={handleTransfer}
                    disabled={isTransferring || formData.status === "completed"}
                    className="mobile-button order-1"
                  >
                    {isTransferring ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        جاري النقل...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        بدء عملية النقل
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    onClick={generateTransferReport}
                    className="mobile-button order-2"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    تقرير النقل
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transfer History */}
        <div>
          <Card className="mobile-card">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">عمليات النقل السابقة</CardTitle>
              <CardDescription>
                تاريخ عمليات نقل الملفات المحاسبية
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {sampleTransfers.map((transfer) => (
                <div key={transfer.id} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 border rounded-lg">
                  <div className="flex flex-col items-center gap-1">
                    {getStatusIcon(transfer.status)}
                    {getMethodIcon(transfer.transferMethod)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-xs sm:text-sm truncate">
                      {transfer.transferId}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {transfer.batchNumber}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {transfer.department} → {transfer.systemDestination}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {getStatusBadge(transfer.status)}
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-muted-foreground">
                        {transfer.totalRecords} سجل
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-primary">
                        {transfer.totalAmount.toFixed(2)} ر.س
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

          {/* Transfer Stats */}
          <Card className="mobile-card mt-4 sm:mt-6">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">إحصائيات النقل</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm">إجمالي العمليات</span>
                <span className="font-semibold">{sampleTransfers.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm">مكتملة</span>
                <span className="font-semibold text-green-600">
                  {sampleTransfers.filter(t => t.status === 'completed').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm">فشلت</span>
                <span className="font-semibold text-red-600">
                  {sampleTransfers.filter(t => t.status === 'failed').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm">إجمالي السجلات</span>
                <span className="font-semibold text-primary">
                  {sampleTransfers.reduce((sum, t) => sum + t.totalRecords, 0)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm">إجمالي المبالغ</span>
                <span className="font-semibold text-primary">
                  {sampleTransfers.reduce((sum, t) => sum + t.totalAmount, 0).toFixed(2)} ر.س
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}