"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Shield, 
  Search, 
  Calendar, 
  User, 
  FileText, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Download
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useMobile } from "@/hooks/use-mobile";

interface AuditLog {
  id: number;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  status: "success" | "warning" | "error";
  ipAddress: string;
  details: string;
  riskLevel: "low" | "medium" | "high";
}

const sampleAuditLogs: AuditLog[] = [
  {
    id: 1,
    timestamp: "2024-01-16 14:30:25",
    user: "أحمد محمد",
    action: "تسجيل دخول",
    resource: "النظام الرئيسي",
    status: "success",
    ipAddress: "192.168.1.100",
    details: "تسجيل دخول ناجح من الهاتف المحمول",
    riskLevel: "low"
  },
  {
    id: 2,
    timestamp: "2024-01-16 14:25:12",
    user: "Sarah Johnson",
    action: "Document Upload",
    resource: "Document Management",
    status: "success",
    ipAddress: "192.168.1.105",
    details: "Uploaded contract_2024.pdf",
    riskLevel: "low"
  },
  {
    id: 3,
    timestamp: "2024-01-16 14:20:45",
    user: "محمد علي",
    action: "تعديل بيانات مالية",
    resource: "Payment System",
    status: "warning",
    ipAddress: "192.168.1.102",
    details: "محاولة تعديل مبلغ الدفع بعد الموافقة",
    riskLevel: "medium"
  },
  {
    id: 4,
    timestamp: "2024-01-16 14:15:33",
    user: "System Admin",
    action: "User Permission Change",
    resource: "User Management",
    status: "success",
    ipAddress: "192.168.1.1",
    details: "Updated user permissions for financial module",
    riskLevel: "high"
  },
  {
    id: 5,
    timestamp: "2024-01-16 14:10:18",
    user: "غير معروف",
    action: "فشل تسجيل الدخول",
    resource: "Authentication System",
    status: "error",
    ipAddress: "10.0.0.25",
    details: "محاولة دخول متعددة بكلمة مرور خاطئة",
    riskLevel: "high"
  }
];

export default function AuditTrailPage() {
  const { t, isRTL } = useLanguage();
  const { isMobile } = useMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedRisk, setSelectedRisk] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [auditLogs] = useState<AuditLog[]>(sampleAuditLogs);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge variant="success">نجح</Badge>;
      case "warning":
        return <Badge variant="warning">تحذير</Badge>;
      case "error":
        return <Badge variant="destructive">خطأ</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "low":
        return <Badge variant="success">منخفض</Badge>;
      case "medium":
        return <Badge variant="warning">متوسط</Badge>;
      case "high":
        return <Badge variant="destructive">عالي</Badge>;
      default:
        return <Badge variant="secondary">{risk}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || log.status === selectedStatus;
    const matchesRisk = !selectedRisk || log.riskLevel === selectedRisk;
    return matchesSearch && matchesStatus && matchesRisk;
  });

  const complianceMetrics = {
    totalLogs: auditLogs.length,
    successfulActions: auditLogs.filter(log => log.status === "success").length,
    warningActions: auditLogs.filter(log => log.status === "warning").length,
    errorActions: auditLogs.filter(log => log.status === "error").length,
    highRiskActions: auditLogs.filter(log => log.riskLevel === "high").length
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Shield className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">{t("auditTrail")}</h1>
          <p className="text-muted-foreground">
            الخطوة العاشرة: مراقبة المطابقة والتدقيق - Audit Trail & Compliance Monitoring
          </p>
        </div>
      </div>

      {/* Compliance Dashboard */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-5">
        <Card className="mobile-card">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium truncate">إجمالي العمليات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-primary">{complianceMetrics.totalLogs}</div>
            <p className="text-xs text-muted-foreground">عملية</p>
          </CardContent>
        </Card>
        
        <Card className="mobile-card">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium truncate">العمليات الناجحة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-green-600">{complianceMetrics.successfulActions}</div>
            <p className="text-xs text-muted-foreground">نجح</p>
          </CardContent>
        </Card>
        
        <Card className="mobile-card">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium truncate">التحذيرات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-yellow-600">{complianceMetrics.warningActions}</div>
            <p className="text-xs text-muted-foreground">تحذير</p>
          </CardContent>
        </Card>
        
        <Card className="mobile-card">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium truncate">الأخطاء</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-red-600">{complianceMetrics.errorActions}</div>
            <p className="text-xs text-muted-foreground">خطأ</p>
          </CardContent>
        </Card>
        
        <Card className="mobile-card">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium truncate">مخاطر عالية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-red-600">{complianceMetrics.highRiskActions}</div>
            <p className="text-xs text-muted-foreground">عالي المخاطر</p>
          </CardContent>
        </Card>
      </div>

      {/* Audit Trail Management */}
      <Card className="mobile-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Activity className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className={isMobile ? "truncate" : ""}>سجل التدقيق - Audit Log</span>
          </CardTitle>
          <CardDescription>
            عرض وتحليل جميع العمليات والأنشطة في النظام
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          {/* Search and Filter */}
          <div className="grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث في السجلات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="حالة العملية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">جميع الحالات</SelectItem>
                  <SelectItem value="success">نجح</SelectItem>
                  <SelectItem value="warning">تحذير</SelectItem>
                  <SelectItem value="error">خطأ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={selectedRisk} onValueChange={setSelectedRisk}>
                <SelectTrigger>
                  <SelectValue placeholder="مستوى المخاطر" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">جميع المستويات</SelectItem>
                  <SelectItem value="low">منخفض</SelectItem>
                  <SelectItem value="medium">متوسط</SelectItem>
                  <SelectItem value="high">عالي</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Button className="w-full mobile-button">
                <Download className="mr-2 h-4 w-4" />
                تصدير التقرير
              </Button>
            </div>
          </div>

          {/* Audit Logs Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto mobile-scroll">
              <Table className={isMobile ? "mobile-table" : ""}>
                <TableHeader>
                  <TableRow>
                    <TableHead>الوقت</TableHead>
                    <TableHead>المستخدم</TableHead>
                    <TableHead>العملية</TableHead>
                    <TableHead>المورد</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>المخاطر</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <div>
                            <p className="text-xs sm:text-sm font-medium">
                              {log.timestamp.split(' ')[1]}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {log.timestamp.split(' ')[0]}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3 text-muted-foreground" />
                          <div>
                            <p className="text-xs sm:text-sm font-medium">{log.user}</p>
                            <p className="text-xs text-muted-foreground">{log.ipAddress}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(log.status)}
                          <span className="text-xs sm:text-sm">{log.action}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {log.resource}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(log.status)}</TableCell>
                      <TableCell>{getRiskBadge(log.riskLevel)}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="mobile-button p-1 sm:p-2">
                          <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
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
              <p>لا توجد سجلات مطابقة للبحث</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}