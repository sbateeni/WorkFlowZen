"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  Package, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  QrCode,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Barcode,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useMobile } from "@/hooks/use-mobile";

interface Asset {
  id: number;
  name: string;
  category: string;
  serialNumber: string;
  location: string;
  condition: "excellent" | "good" | "fair" | "poor";
  status: "active" | "maintenance" | "retired" | "missing";
  purchaseDate: string;
  purchaseValue: number;
  currentValue: number;
  assignedTo: string;
  warranty: string;
  tags: string[];
}

const sampleAssets: Asset[] = [
  {
    id: 1,
    name: "لابتوب Dell Latitude 7420",
    category: "أجهزة حاسوب",
    serialNumber: "DLL-2024-001",
    location: "مكتب الإدارة - الطابق الثالث",
    condition: "excellent",
    status: "active",
    purchaseDate: "2024-01-15",
    purchaseValue: 8500,
    currentValue: 7200,
    assignedTo: "أحمد محمد",
    warranty: "2026-01-15",
    tags: ["laptop", "dell", "work"]
  },
  {
    id: 2,
    name: "HP LaserJet Pro Printer",
    category: "طابعات",
    serialNumber: "HP-2023-045",
    location: "قسم المحاسبة - الطابق الثاني",
    condition: "good",
    status: "active",
    purchaseDate: "2023-06-10",
    purchaseValue: 3200,
    currentValue: 2400,
    assignedTo: "فاطمة أحمد",
    warranty: "2024-06-10",
    tags: ["printer", "hp", "office"]
  },
  {
    id: 3,
    name: "كاميرا مراقبة IP",
    category: "أمان ومراقبة",
    serialNumber: "CAM-2024-012",
    location: "المدخل الرئيسي",
    condition: "excellent",
    status: "active",
    purchaseDate: "2024-03-20",
    purchaseValue: 1800,
    currentValue: 1600,
    assignedTo: "قسم الأمان",
    warranty: "2027-03-20",
    tags: ["camera", "security", "ip"]
  },
  {
    id: 4,
    name: "جهاز عرض Epson",
    category: "أجهزة عرض",
    serialNumber: "EPS-2022-089",
    location: "قاعة الاجتماعات الكبرى",
    condition: "fair",
    status: "maintenance",
    purchaseDate: "2022-11-05",
    purchaseValue: 4500,
    currentValue: 2700,
    assignedTo: "إدارة المرافق",
    warranty: "2024-11-05",
    tags: ["projector", "epson", "meeting"]
  },
  {
    id: 5,
    name: "خادم HP ProLiant",
    category: "خوادم",
    serialNumber: "SRV-2023-003",
    location: "غرفة الخوادم - الطابق الأول",
    condition: "good",
    status: "active",
    purchaseDate: "2023-08-12",
    purchaseValue: 25000,
    currentValue: 20000,
    assignedTo: "قسم تقنية المعلومات",
    warranty: "2026-08-12",
    tags: ["server", "hp", "datacenter"]
  }
];

const assetCategories = [
  "أجهزة حاسوب - Computers",
  "طابعات - Printers",
  "أمان ومراقبة - Security",
  "أجهزة عرض - Projectors",
  "خوادم - Servers",
  "أثاث - Furniture",
  "أخرى - Others"
];

export default function AssetManagementPage() {
  const { t, isRTL } = useLanguage();
  const { isMobile } = useMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [assets] = useState<Asset[]>(sampleAssets);

  const getConditionBadge = (condition: string) => {
    switch (condition) {
      case "excellent":
        return <Badge variant="success">ممتاز</Badge>;
      case "good":
        return <Badge variant="success">جيد</Badge>;
      case "fair":
        return <Badge variant="warning">مقبول</Badge>;
      case "poor":
        return <Badge variant="destructive">ضعيف</Badge>;
      default:
        return <Badge variant="secondary">{condition}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success">نشط</Badge>;
      case "maintenance":
        return <Badge variant="warning">صيانة</Badge>;
      case "retired":
        return <Badge variant="secondary">متقاعد</Badge>;
      case "missing":
        return <Badge variant="destructive">مفقود</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "maintenance":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "retired":
        return <Package className="h-4 w-4 text-gray-500" />;
      case "missing":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getValueTrend = (purchaseValue: number, currentValue: number) => {
    const depreciation = ((purchaseValue - currentValue) / purchaseValue) * 100;
    return {
      percentage: depreciation,
      trend: depreciation > 20 ? "down" : "stable"
    };
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || asset.category === selectedCategory;
    const matchesStatus = !selectedStatus || asset.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const assetStats = {
    total: assets.length,
    active: assets.filter(a => a.status === "active").length,
    maintenance: assets.filter(a => a.status === "maintenance").length,
    retired: assets.filter(a => a.status === "retired").length,
    missing: assets.filter(a => a.status === "missing").length,
    totalValue: assets.reduce((sum, a) => sum + a.currentValue, 0),
    totalPurchaseValue: assets.reduce((sum, a) => sum + a.purchaseValue, 0)
  };

  const isWarrantyExpiringSoon = (warrantyDate: string) => {
    const today = new Date();
    const warranty = new Date(warrantyDate);
    const diffTime = warranty.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 90 && diffDays > 0;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Package className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">{t("assetManagement")}</h1>
            <p className="text-muted-foreground">
              الخطوة الثالثة عشرة: إدارة الأصول وتتبع المخزون
            </p>
          </div>
        </div>
        <Button size={isMobile ? "sm" : "default"}>
          <Plus className="h-4 w-4 mr-2" />
          أصل جديد
        </Button>
      </div>

      {/* Asset Statistics */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        <Card className="mobile-card">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium truncate">إجمالي الأصول</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-primary">{assetStats.total}</div>
            <p className="text-xs text-muted-foreground">أصل</p>
          </CardContent>
        </Card>
        
        <Card className="mobile-card">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium truncate">الأصول النشطة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-green-600">{assetStats.active}</div>
            <p className="text-xs text-muted-foreground">نشط</p>
          </CardContent>
        </Card>
        
        <Card className="mobile-card">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium truncate">تحت الصيانة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-yellow-600">{assetStats.maintenance}</div>
            <p className="text-xs text-muted-foreground">صيانة</p>
          </CardContent>
        </Card>
        
        <Card className="mobile-card">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium truncate">متقاعدة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-gray-600">{assetStats.retired}</div>
            <p className="text-xs text-muted-foreground">متقاعد</p>
          </CardContent>
        </Card>
        
        <Card className="mobile-card">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium truncate">القيمة الحالية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-xl font-bold text-blue-600">
              {(assetStats.totalValue / 1000).toFixed(0)}K SAR
            </div>
            <p className="text-xs text-muted-foreground">ريال سعودي</p>
          </CardContent>
        </Card>
        
        <Card className="mobile-card">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium truncate">الاستهلاك</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-xl font-bold text-red-600">
              {(((assetStats.totalPurchaseValue - assetStats.totalValue) / assetStats.totalPurchaseValue) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">انخفاض القيمة</p>
          </CardContent>
        </Card>
      </div>

      {/* Asset Management */}
      <Card className="mobile-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Package className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className={isMobile ? "truncate" : ""}>إدارة الأصول</span>
          </CardTitle>
          <CardDescription>
            عرض وإدارة جميع أصول الشركة والمعدات
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          {/* Search and Filter */}
          <div className="grid gap-2 sm:gap-4 grid-cols-1 sm:grid-cols-3">
            <div>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث في الأصول..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="فئة الأصل" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">جميع الفئات</SelectItem>
                  {assetCategories.map((category) => (
                    <SelectItem key={category} value={category.split(' - ')[0]}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="حالة الأصل" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">جميع الحالات</SelectItem>
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="maintenance">صيانة</SelectItem>
                  <SelectItem value="retired">متقاعد</SelectItem>
                  <SelectItem value="missing">مفقود</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Assets Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto mobile-scroll">
              <Table className={isMobile ? "mobile-table" : ""}>
                <TableHeader>
                  <TableRow>
                    <TableHead>الأصل</TableHead>
                    <TableHead>الموقع</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الوضع</TableHead>
                    <TableHead>القيمة</TableHead>
                    <TableHead>الضمان</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssets.map((asset) => {
                    const valueTrend = getValueTrend(asset.purchaseValue, asset.currentValue);
                    const warrantyExpiring = isWarrantyExpiringSoon(asset.warranty);
                    return (
                      <TableRow key={asset.id}>
                        <TableCell>
                          <div className="flex items-start gap-2">
                            {getStatusIcon(asset.status)}
                            <div>
                              <p className="font-medium text-xs sm:text-sm truncate max-w-[120px] sm:max-w-[200px]">
                                {asset.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {asset.serialNumber}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                مخصص لـ: {asset.assignedTo}
                              </p>
                              <div className="flex gap-1 mt-1">
                                {asset.tags.slice(0, 2).map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs px-1 py-0">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs sm:text-sm truncate max-w-[100px] sm:max-w-[150px]">
                              {asset.location}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{getConditionBadge(asset.condition)}</TableCell>
                        <TableCell>{getStatusBadge(asset.status)}</TableCell>
                        <TableCell>
                          <div>
                            <p className="text-xs sm:text-sm font-medium">
                              {asset.currentValue.toLocaleString()} SAR
                            </p>
                            <div className="flex items-center gap-1">
                              {valueTrend.trend === "down" ? (
                                <TrendingDown className="h-3 w-3 text-red-500" />
                              ) : (
                                <TrendingUp className="h-3 w-3 text-green-500" />
                              )}
                              <span className={`text-xs ${
                                valueTrend.trend === "down" ? "text-red-500" : "text-green-500"
                              }`}>
                                -{valueTrend.percentage.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="text-xs sm:text-sm">{asset.warranty}</p>
                            {warrantyExpiring && (
                              <Badge variant="warning" className="text-xs mt-1">
                                قريب الانتهاء
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="mobile-button p-1 sm:p-2">
                              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="mobile-button p-1 sm:p-2">
                              <QrCode className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="mobile-button p-1 sm:p-2">
                              <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
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

          {filteredAssets.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>لا توجد أصول مطابقة للبحث</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Warranty Alerts */}
      <Card className="mobile-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
            تنبيهات الضمان
          </CardTitle>
          <CardDescription>
            الأصول التي ستنتهي ضماناتها قريباً
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {assets
              .filter(asset => isWarrantyExpiringSoon(asset.warranty))
              .map((asset) => {
                const today = new Date();
                const warranty = new Date(asset.warranty);
                const daysLeft = Math.ceil((warranty.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                return (
                  <div key={asset.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className={`h-4 w-4 ${
                        daysLeft <= 30 ? 'text-red-500' : 'text-yellow-500'
                      }`} />
                      <div>
                        <p className="font-medium text-sm">{asset.name}</p>
                        <p className="text-xs text-muted-foreground">{asset.serialNumber}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={daysLeft <= 30 ? "destructive" : "warning"} className="text-xs">
                        {daysLeft} يوم باقي
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{asset.warranty}</p>
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