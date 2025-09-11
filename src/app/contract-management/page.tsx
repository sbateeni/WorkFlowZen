"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Download,
  AlertTriangle,
  CheckCircle,
  Clock,
  Building,
  Calendar,
  DollarSign
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useMobile } from "@/hooks/use-mobile";

interface Contract {
  id: number;
  title: string;
  vendor: string;
  type: string;
  value: number;
  startDate: string;
  endDate: string;
  status: "active" | "expired" | "pending" | "terminated";
  renewalDate: string;
  manager: string;
  tags: string[];
}

const sampleContracts: Contract[] = [
  {
    id: 1,
    title: "عقد خدمات تقنية معلومات",
    vendor: "شركة التقنية المتقدمة",
    type: "خدمات",
    value: 250000,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "active",
    renewalDate: "2024-10-01",
    manager: "أحمد محمد",
    tags: ["تقنية", "خدمات", "سنوي"]
  },
  {
    id: 2,
    title: "Software License Agreement",
    vendor: "Tech Solutions Inc.",
    type: "ترخيص",
    value: 150000,
    startDate: "2023-06-01",
    endDate: "2024-05-31",
    status: "expired",
    renewalDate: "2024-03-01",
    manager: "Sarah Johnson",
    tags: ["software", "license", "renewal"]
  },
  {
    id: 3,
    title: "عقد صيانة وتشغيل",
    vendor: "مجموعة الصيانة المحترفة",
    type: "صيانة",
    value: 80000,
    startDate: "2024-03-01",
    endDate: "2025-02-28",
    status: "active",
    renewalDate: "2024-12-01",
    manager: "محمد علي",
    tags: ["صيانة", "تشغيل", "سنوي"]
  },
  {
    id: 4,
    title: "Consulting Services Contract",
    vendor: "Business Consultants LLC",
    type: "استشارات",
    value: 120000,
    startDate: "2024-04-01",
    endDate: "2024-09-30",
    status: "pending",
    renewalDate: "2024-07-01",
    manager: "فاطمة أحمد",
    tags: ["consulting", "business", "project"]
  }
];

const contractTypes = [
  "خدمات - Services",
  "ترخيص - License",
  "صيانة - Maintenance", 
  "استشارات - Consulting",
  "توريد - Supply",
  "أخرى - Others"
];

export default function ContractManagementPage() {
  const { t, isRTL } = useLanguage();
  const { isMobile } = useMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [contracts] = useState<Contract[]>(sampleContracts);
  const [showAddForm, setShowAddForm] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success">نشط</Badge>;
      case "expired":
        return <Badge variant="destructive">منتهي</Badge>;
      case "pending":
        return <Badge variant="warning">معلق</Badge>;
      case "terminated":
        return <Badge variant="secondary">ملغي</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "expired":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "terminated":
        return <AlertTriangle className="h-4 w-4 text-gray-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.manager.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || contract.status === selectedStatus;
    const matchesType = !selectedType || contract.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const contractStats = {
    total: contracts.length,
    active: contracts.filter(c => c.status === "active").length,
    expired: contracts.filter(c => c.status === "expired").length,
    pending: contracts.filter(c => c.status === "pending").length,
    totalValue: contracts.reduce((sum, c) => sum + c.value, 0)
  };

  const getDaysUntilExpiry = (endDate: string) => {
    const today = new Date();
    const expiry = new Date(endDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">{t("contractManagement")}</h1>
            <p className="text-muted-foreground">
              الخطوة الثانية عشرة: إدارة العقود وبوابة الموردين
            </p>
          </div>
        </div>
        <Button onClick={() => setShowAddForm(true)} size={isMobile ? "sm" : "default"}>
          <Plus className="h-4 w-4 mr-2" />
          عقد جديد
        </Button>
      </div>

      {/* Contract Statistics */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-5">
        <Card className="mobile-card">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium truncate">إجمالي العقود</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-primary">{contractStats.total}</div>
            <p className="text-xs text-muted-foreground">عقد</p>
          </CardContent>
        </Card>
        
        <Card className="mobile-card">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium truncate">العقود النشطة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-green-600">{contractStats.active}</div>
            <p className="text-xs text-muted-foreground">نشط</p>
          </CardContent>
        </Card>
        
        <Card className="mobile-card">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium truncate">العقود المنتهية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-red-600">{contractStats.expired}</div>
            <p className="text-xs text-muted-foreground">منتهي</p>
          </CardContent>
        </Card>
        
        <Card className="mobile-card">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium truncate">العقود المعلقة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-yellow-600">{contractStats.pending}</div>
            <p className="text-xs text-muted-foreground">معلق</p>
          </CardContent>
        </Card>
        
        <Card className="mobile-card">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium truncate">القيمة الإجمالية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-xl font-bold text-blue-600">
              {(contractStats.totalValue / 1000).toFixed(0)}K SAR
            </div>
            <p className="text-xs text-muted-foreground">ريال سعودي</p>
          </CardContent>
        </Card>
      </div>

      {/* Contract Management */}
      <Card className="mobile-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Building className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className={isMobile ? "truncate" : ""}>إدارة العقود</span>
          </CardTitle>
          <CardDescription>
            عرض وإدارة جميع العقود والاتفاقيات
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          {/* Search and Filter */}
          <div className="grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-3">
            <div>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث في العقود..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="حالة العقد" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">جميع الحالات</SelectItem>
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="expired">منتهي</SelectItem>
                  <SelectItem value="pending">معلق</SelectItem>
                  <SelectItem value="terminated">ملغي</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="نوع العقد" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">جميع الأنواع</SelectItem>
                  {contractTypes.map((type) => (
                    <SelectItem key={type} value={type.split(' - ')[0]}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Contracts Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto mobile-scroll">
              <Table className={isMobile ? "mobile-table" : ""}>
                <TableHeader>
                  <TableRow>
                    <TableHead>العقد</TableHead>
                    <TableHead>المورد</TableHead>
                    <TableHead>النوع</TableHead>
                    <TableHead>القيمة</TableHead>
                    <TableHead>انتهاء العقد</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContracts.map((contract) => {
                    const daysUntilExpiry = getDaysUntilExpiry(contract.endDate);
                    return (
                      <TableRow key={contract.id}>
                        <TableCell>
                          <div className="flex items-start gap-2">
                            {getStatusIcon(contract.status)}
                            <div>
                              <p className="font-medium text-xs sm:text-sm truncate max-w-[120px] sm:max-w-[200px]">
                                {contract.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                المدير: {contract.manager}
                              </p>
                              <div className="flex gap-1 mt-1">
                                {contract.tags.slice(0, 2).map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Building className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs sm:text-sm truncate max-w-[100px] sm:max-w-[150px]">
                              {contract.vendor}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{contract.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs sm:text-sm">
                              {(contract.value / 1000).toFixed(0)}K SAR
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <div>
                              <p className="text-xs sm:text-sm">{contract.endDate}</p>
                              <p className={`text-xs ${
                                daysUntilExpiry < 30 ? 'text-red-500' : 
                                daysUntilExpiry < 90 ? 'text-yellow-500' : 'text-green-500'
                              }`}>
                                {daysUntilExpiry > 0 ? `${daysUntilExpiry} يوم` : 'منتهي'}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(contract.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="mobile-button p-1 sm:p-2">
                              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="mobile-button p-1 sm:p-2">
                              <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="mobile-button p-1 sm:p-2">
                              <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>

          {filteredContracts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <FileContract className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>لا توجد عقود مطابقة للبحث</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contract Renewal Alerts */}
      <Card className="mobile-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
            تنبيهات التجديد
          </CardTitle>
          <CardDescription>
            العقود التي تحتاج إلى تجديد قريباً
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {contracts
              .filter(contract => {
                const days = getDaysUntilExpiry(contract.endDate);
                return days > 0 && days <= 90;
              })
              .map((contract) => {
                const days = getDaysUntilExpiry(contract.endDate);
                return (
                  <div key={contract.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className={`h-4 w-4 ${
                        days <= 30 ? 'text-red-500' : 'text-yellow-500'
                      }`} />
                      <div>
                        <p className="font-medium text-sm">{contract.title}</p>
                        <p className="text-xs text-muted-foreground">{contract.vendor}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={days <= 30 ? "destructive" : "warning"} className="text-xs">
                        {days} يوم باقي
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{contract.endDate}</p>
                    </div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}