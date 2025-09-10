"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Shield, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Calendar,
  FileText,
  Activity,
  Lock,
  Settings
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useToast } from "@/hooks/use-toast";
import { useMobile } from "@/hooks/use-mobile";

interface AuditLogEntry {
  id: number;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  resourceId: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  status: string;
  riskLevel: string;
  complianceFlag: boolean;
}

const auditActions = [
  "تسجيل دخول - Login",
  "تسجيل خروج - Logout", 
  "إنشاء - Create",
  "تعديل - Update",
  "حذف - Delete",
  "عرض - View",
  "تصدير - Export",
  "طباعة - Print",
  "موافقة - Approve",
  "رفض - Reject"
];

const riskLevels = [
  { value: "low", label: "منخفض", color: "secondary" },
  { value: "medium", label: "متوسط", color: "warning" },
  { value: "high", label: "عالي", color: "destructive" },
  { value: "critical", label: "حرج", color: "destructive" }
];

const complianceRules = [
  "سياسة كلمات المرور",
  "الوصول خارج ساعات العمل",
  "التعديل بدون موافقة",
  "الوصول من IP غير مصرح",
  "محاولات فاشلة متكررة",
  "حذف بيانات حساسة",
  "تصدير بيانات كبيرة الحجم"
];

const sampleAuditLogs: AuditLogEntry[] = [
  {
    id: 1,
    timestamp: "2024-01-20 14:30:25",
    userId: "USER001",
    userName: "أحمد محمد",
    action: "موافقة",
    resource: "طلب دفع",
    resourceId: "PAY-REQ-2024-001",
    details: "موافقة على طلب دفع بقيمة 15,750 ر.س",
    ipAddress: "192.168.1.100",
    userAgent: "Chrome 120.0",
    status: "success",
    riskLevel: "low",
    complianceFlag: false
  },
  {
    id: 2,
    timestamp: "2024-01-20 15:45:12",
    userId: "USER002", 
    userName: "سارة أحمد",
    action: "تعديل",
    resource: "فاتورة",
    resourceId: "INV-REC-2024-002",
    details: "تعديل مبلغ الفاتورة من 8,900 إلى 8,950 ر.س",
    ipAddress: "192.168.1.105",
    userAgent: "Firefox 121.0",
    status: "success",
    riskLevel: "medium",
    complianceFlag: true
  },
  {
    id: 3,
    timestamp: "2024-01-20 22:15:33",
    userId: "USER003",
    userName: "محمد علي",
    action: "تسجيل دخول",
    resource: "نظام",
    resourceId: "SYSTEM",
    details: "محاولة تسجيل دخول خارج ساعات العمل",
    ipAddress: "203.45.67.89",
    userAgent: "Safari 17.2",
    status: "failed",
    riskLevel: "high",
    complianceFlag: true
  }
];

export default function AuditTrailPage() {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const { isMobile } = useMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const [selectedRisk, setSelectedRisk] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showComplianceOnly, setShowComplianceOnly] = useState(false);

  const filteredLogs = sampleAuditLogs.filter(log => {
    if (searchTerm && !log.details.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !log.resource.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (selectedAction && !log.action.includes(selectedAction)) return false;
    if (selectedRisk && log.riskLevel !== selectedRisk) return false;
    if (selectedUser && log.userId !== selectedUser) return false;
    if (showComplianceOnly && !log.complianceFlag) return false;
    return true;
  });

  const exportAuditReport = () => {
    toast({
      title: "تصدير تقرير التدقيق",
      description: "جاري إنشاء تقرير شامل لسجل التدقيق",
    });
  };

  const getRiskBadge = (riskLevel: string) => {
    const risk = riskLevels.find(r => r.value === riskLevel);
    return risk ? <Badge variant={risk.color as any}>{risk.label}</Badge> : 
                  <Badge variant="secondary">{riskLevel}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{t("auditTrail")}</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            الخطوة العاشرة: مراقبة المطابقة والتدقيق الشامل
          </p>
        </div>
      </div>

      {/* Filter Panel */}
      <Card className="mobile-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
            مرشحات البحث والتصفية
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mobile-form space-y-3 sm:space-y-4">
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="searchTerm">البحث النصي</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="searchTerm"
                    placeholder="البحث في السجلات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="selectedAction">الإجراء</Label>
                <Select value={selectedAction} onValueChange={setSelectedAction}>
                  <SelectTrigger>
                    <SelectValue placeholder="جميع الإجراءات" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">جميع الإجراءات</SelectItem>
                    {auditActions.map((action) => (
                      <SelectItem key={action} value={action.split(' - ')[0]}>
                        {action}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="selectedRisk">مستوى المخاطر</Label>
                <Select value={selectedRisk} onValueChange={setSelectedRisk}>
                  <SelectTrigger>
                    <SelectValue placeholder="جميع المستويات" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">جميع المستويات</SelectItem>
                    {riskLevels.map((risk) => (
                      <SelectItem key={risk.value} value={risk.value}>
                        {risk.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="selectedUser">المستخدم</Label>
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                  <SelectTrigger>
                    <SelectValue placeholder="جميع المستخدمين" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">جميع المستخدمين</SelectItem>
                    <SelectItem value="USER001">أحمد محمد</SelectItem>
                    <SelectItem value="USER002">سارة أحمد</SelectItem>
                    <SelectItem value="USER003">محمد علي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="dateFrom">من تاريخ</Label>
                <Input
                  id="dateFrom"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateTo">إلى تاريخ</Label>
                <Input
                  id="dateTo"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label className="invisible">إجراءات</Label>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    className="mobile-button flex-1"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedAction("");
                      setSelectedRisk("");
                      setSelectedUser("");
                      setDateFrom("");
                      setDateTo("");
                      setShowComplianceOnly(false);
                    }}
                  >
                    إعادة تعيين
                  </Button>
                  <Button 
                    className="mobile-button flex-1"
                    onClick={exportAuditReport}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    تصدير
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card className="mobile-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Activity className="h-4 w-4 sm:h-5 sm:w-5" />
              سجل التدقيق ({filteredLogs.length} نتيجة)
            </span>
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={showComplianceOnly}
                  onChange={(e) => setShowComplianceOnly(e.target.checked)}
                  className="rounded"
                />
                مخالفات المطابقة فقط
              </label>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto mobile-scroll">
              <Table className={isMobile ? "mobile-table" : ""}>
                <TableHeader>
                  <TableRow>
                    <TableHead>الوقت</TableHead>
                    <TableHead>المستخدم</TableHead>
                    <TableHead>الإجراء</TableHead>
                    <TableHead>المورد</TableHead>
                    <TableHead>التفاصيل</TableHead>
                    <TableHead>المخاطر</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-xs">
                        {isMobile ? log.timestamp.split(' ')[1] : log.timestamp}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3" />
                          <div>
                            <p className="font-medium text-xs">{log.userName}</p>
                            <p className="text-xs text-muted-foreground">{log.userId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-xs">{log.resource}</p>
                          <p className="text-xs text-muted-foreground">{log.resourceId}</p>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px]">
                        <p className="text-xs truncate" title={log.details}>
                          {isMobile ? log.details.substring(0, 30) + '...' : log.details}
                        </p>
                        <div className="flex items-center gap-1 mt-1">
                          {log.complianceFlag && (
                            <Badge variant="warning" className="text-xs px-1 py-0">
                              مطابقة
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getRiskBadge(log.riskLevel)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(log.status)}
                          <span className="text-xs capitalize">{log.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" className="mobile-button p-1 sm:p-2">
                            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="mobile-button p-1 sm:p-2">
                            <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>لا توجد سجلات تطابق المعايير المحددة</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Compliance Dashboard */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
        <Card className="mobile-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">قواعد المطابقة</CardTitle>
            <CardDescription>
              القواعد النشطة لمراقبة المطابقة والأمان
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {complianceRules.map((rule, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Lock className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{rule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="success" className="text-xs">نشط</Badge>
                    <Button variant="ghost" size="sm" className="mobile-button p-1">
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mobile-card">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">إحصائيات التدقيق</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">إجمالي الأحداث</span>
              <span className="font-semibold">{sampleAuditLogs.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">أحداث عالية المخاطر</span>
              <span className="font-semibold text-red-600">
                {sampleAuditLogs.filter(l => l.riskLevel === 'high').length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">مخالفات المطابقة</span>
              <span className="font-semibold text-orange-600">
                {sampleAuditLogs.filter(l => l.complianceFlag).length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">محاولات فاشلة</span>
              <span className="font-semibold text-red-600">
                {sampleAuditLogs.filter(l => l.status === 'failed').length}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">المستخدمون النشطون</span>
              <span className="font-semibold text-green-600">
                {new Set(sampleAuditLogs.map(l => l.userId)).size}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}