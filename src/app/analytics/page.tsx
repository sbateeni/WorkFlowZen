"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  Calendar, 
  Download,
  RefreshCw,
  Users,
  DollarSign,
  FileText,
  Clock,
  Target,
  Activity
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface AnalyticsData {
  period: string;
  revenue: number;
  orders: number;
  users: number;
  completion: number;
}

const analyticsData: AnalyticsData[] = [
  { period: "يناير", revenue: 125000, orders: 45, users: 234, completion: 87 },
  { period: "فبراير", revenue: 132000, orders: 52, users: 267, completion: 91 },
  { period: "مارس", revenue: 118000, orders: 41, users: 245, completion: 83 },
  { period: "أبريل", revenue: 145000, orders: 58, users: 289, completion: 94 },
  { period: "مايو", revenue: 156000, orders: 63, users: 312, completion: 96 },
  { period: "يونيو", revenue: 167000, orders: 71, users: 334, completion: 98 }
];

const kpiMetrics = [
  {
    title: "إجمالي الإيرادات",
    value: formatCurrency(843000, "ILS", "ar"),
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600"
  },
  {
    title: "عدد الطلبات",
    value: "330",
    change: "+8.2%",
    trend: "up",
    icon: FileText,
    color: "text-blue-600"
  },
  {
    title: "المستخدمين النشطين",
    value: "1,681",
    change: "+15.3%",
    trend: "up",
    icon: Users,
    color: "text-purple-600"
  },
  {
    title: "متوسط وقت الإنجاز",
    value: "4.2 يوم",
    change: "-7.1%",
    trend: "down",
    icon: Clock,
    color: "text-orange-600"
  },
  {
    title: "معدل الإنجاز",
    value: "91.5%",
    change: "+3.2%",
    trend: "up",
    icon: Target,
    color: "text-green-600"
  },
  {
    title: "مستوى الرضا",
    value: "4.7/5",
    change: "+0.3",
    trend: "up",
    icon: Activity,
    color: "text-blue-600"
  }
];

const workflowAnalytics = [
  { step: "الاستشارة", completed: 95, pending: 5, efficiency: 92 },
  { step: "إدخال البيانات", completed: 87, pending: 13, efficiency: 88 },
  { step: "أمر الشراء", completed: 82, pending: 18, efficiency: 85 },
  { step: "طلب الخدمة", completed: 78, pending: 22, efficiency: 81 },
  { step: "تسليم الخدمة", completed: 74, pending: 26, efficiency: 79 },
  { step: "استلام الفاتورة", completed: 71, pending: 29, efficiency: 76 },
  { step: "طلب الدفع", completed: 68, pending: 32, efficiency: 74 },
  { step: "موافقة الدفع", completed: 65, pending: 35, efficiency: 72 },
  { step: "النقل المحاسبي", completed: 62, pending: 38, efficiency: 70 }
];

export default function AnalyticsPage() {
  // Simple state management without external hooks
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
  const [selectedMetric, setSelectedMetric] = useState("revenue");
  
  // Temporary fallbacks
  const isRTL = false;
  const isMobile = false;
  const t = (key: string) => key;

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? 
      <TrendingUp className="h-4 w-4 text-green-500" /> : 
      <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-green-600" : "text-red-600";
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">{t("analytics")}</h1>
            <p className="text-muted-foreground">
              الخطوة الحادية عشرة: التحليلات المتقدمة ولوحة معلومات الأعمال
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size={isMobile ? "sm" : "default"}>
            <RefreshCw className="h-4 w-4 mr-2" />
            تحديث
          </Button>
          <Button size={isMobile ? "sm" : "default"}>
            <Download className="h-4 w-4 mr-2" />
            تصدير
          </Button>
        </div>
      </div>

      {/* Time Period Selector */}
      <Card className="mobile-card">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">نظرة عامة على الأداء</h3>
              <p className="text-muted-foreground text-sm">تحليل شامل لمؤشرات الأداء الرئيسية</p>
            </div>
            <div className="flex gap-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">الشهر الماضي</SelectItem>
                  <SelectItem value="3months">3 أشهر</SelectItem>
                  <SelectItem value="6months">6 أشهر</SelectItem>
                  <SelectItem value="1year">سنة كاملة</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Metrics */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {kpiMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="mobile-card">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium truncate">{metric.title}</CardTitle>
                  <Icon className={`h-4 w-4 ${metric.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(metric.trend)}
                    <span className={`text-sm ${getTrendColor(metric.trend)}`}>
                      {metric.change}
                    </span>
                    <span className="text-sm text-muted-foreground">من الشهر الماضي</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Revenue Chart */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="mobile-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                تحليل الإيرادات الشهرية
              </CardTitle>
              <CardDescription>
                نمو الإيرادات والطلبات خلال الأشهر الستة الماضية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.map((data, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{data.period} 2024</span>
                      <div className="flex gap-4 text-sm">
                        <span className="text-green-600">{formatCurrency(data.revenue, "ILS", "ar")}</span>
                        <span className="text-blue-600">{data.orders} طلب</span>
                        <span className="text-purple-600">{data.users} مستخدم</span>
                      </div>
                    </div>
                    <Progress value={data.completion} className="h-2" />
                    <div className="text-xs text-muted-foreground text-right">
                      {data.completion}% مكتمل
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Workflow Efficiency */}
        <div>
          <Card className="mobile-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <PieChart className="h-5 w-5" />
                <span className={isMobile ? "truncate" : ""}>كفاءة سير العمل</span>
              </CardTitle>
              <CardDescription>
                تحليل أداء كل خطوة في سير العمل
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {workflowAnalytics.slice(0, isMobile ? 5 : 9).map((step, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium truncate">{step.step}</span>
                    <Badge variant="outline" className="text-xs">
                      {step.efficiency}%
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <Progress value={step.completed} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{step.completed}% مكتمل</span>
                      <span>{step.pending}% معلق</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Detailed Analytics */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
        <Card className="mobile-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              تحليل المستخدمين
            </CardTitle>
            <CardDescription>إحصائيات استخدام النظام والنشاط</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 grid-cols-2">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-600">1,681</div>
                <div className="text-sm text-muted-foreground">مستخدم نشط</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-600">94.2%</div>
                <div className="text-sm text-muted-foreground">معدل النشاط</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-600">7.3</div>
                <div className="text-sm text-muted-foreground">متوسط الجلسات</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-bold text-orange-600">12.4 دقيقة</div>
                <div className="text-sm text-muted-foreground">متوسط الجلسة</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mobile-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              مؤشرات الأداء المستهدفة
            </CardTitle>
            <CardDescription>مقارنة الأداء الحالي بالأهداف المحددة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">الإيرادات الشهرية</span>
                  <span className="text-sm text-muted-foreground">167K / 200K ₪</span>
                </div>
                <Progress value={83.5} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">رضا العملاء</span>
                  <span className="text-sm text-muted-foreground">4.7 / 5.0</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">كفاءة سير العمل</span>
                  <span className="text-sm text-muted-foreground">91.5 / 95%</span>
                </div>
                <Progress value={96.3} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">وقت الاستجابة</span>
                  <span className="text-sm text-muted-foreground">4.2 / 3.0 يوم</span>
                </div>
                <Progress value={71.4} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}