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
import { 
  Settings, 
  Calendar, 
  User, 
  MapPin, 
  Clock, 
  FileText, 
  Send, 
  CheckCircle,
  AlertCircle,
  Wrench,
  Zap,
  Monitor,
  Shield
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useToast } from "@/hooks/use-toast";
import { useMobile } from "@/hooks/use-mobile";

interface ServiceRequestData {
  requestNumber: string;
  serviceType: string;
  title: string;
  description: string;
  priority: string;
  requestedDate: string;
  preferredTime: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  location: string;
  requirements: string[];
  estimatedDuration: string;
  budget: string;
  notes: string;
}

const serviceTypes = [
  { value: "technical", label: "دعم تقني - Technical Support", icon: Monitor },
  { value: "maintenance", label: "صيانة - Maintenance", icon: Wrench },
  { value: "installation", label: "تركيب - Installation", icon: Settings },
  { value: "consultation", label: "استشارة - Consultation", icon: User },
  { value: "security", label: "أمان - Security", icon: Shield },
  { value: "electrical", label: "كهربائي - Electrical", icon: Zap }
];

const serviceRequirements = [
  "أدوات متخصصة - Specialized Tools",
  "فريق عمل - Work Team", 
  "إذن أمني - Security Clearance",
  "معدات واقية - Protective Equipment",
  "وصول للإنترنت - Internet Access",
  "كهرباء - Electricity",
  "منطقة عمل آمنة - Safe Work Area",
  "نسخ احتياطية - Backup Copies"
];

const sampleRequests = [
  {
    id: 1,
    requestNumber: "SR-2024-001",
    title: "صيانة أنظمة الشبكة",
    serviceType: "technical",
    status: "in_progress",
    priority: "high",
    requestedDate: "2024-01-16",
    clientName: "شركة التقنيات المتقدمة"
  },
  {
    id: 2,
    requestNumber: "SR-2024-002", 
    title: "System Configuration Setup",
    serviceType: "installation",
    status: "pending",
    priority: "medium",
    requestedDate: "2024-01-18",
    clientName: "Advanced Solutions Ltd"
  },
  {
    id: 3,
    requestNumber: "SR-2024-003",
    title: "استشارة أمنية للأنظمة",
    serviceType: "security",
    status: "completed",
    priority: "urgent",
    requestedDate: "2024-01-15",
    clientName: "مؤسسة الأمان الشامل"
  }
];

export default function ServiceRequestPage() {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const { isMobile } = useMobile();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ServiceRequestData>({
    requestNumber: `SR-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
    serviceType: "",
    title: "",
    description: "",
    priority: "",
    requestedDate: "",
    preferredTime: "",
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    location: "",
    requirements: [],
    estimatedDuration: "",
    budget: "",
    notes: ""
  });

  const handleInputChange = (field: keyof ServiceRequestData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRequirementChange = (requirement: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      requirements: checked 
        ? [...prev.requirements, requirement]
        : prev.requirements.filter(r => r !== requirement)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "تم إرسال طلب الخدمة بنجاح",
        description: `رقم الطلب: ${formData.requestNumber}`,
      });
      
      // Reset form
      setFormData({
        requestNumber: `SR-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
        serviceType: "",
        title: "",
        description: "",
        priority: "",
        requestedDate: "",
        preferredTime: "",
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        location: "",
        requirements: [],
        estimatedDuration: "",
        budget: "",
        notes: ""
      });
    } catch (error) {
      toast({
        title: "خطأ في الإرسال",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="success">مكتمل</Badge>;
      case "in_progress":
        return <Badge variant="pending">قيد التنفيذ</Badge>;
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
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="destructive">عاجل</Badge>;
      case "high":
        return <Badge variant="warning">عالي</Badge>;
      case "medium":
        return <Badge variant="pending">متوسط</Badge>;
      case "low":
        return <Badge variant="secondary">منخفض</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const getServiceTypeIcon = (type: string) => {
    const serviceType = serviceTypes.find(s => s.value === type);
    if (serviceType) {
      const Icon = serviceType.icon;
      return <Icon className="h-4 w-4" />;
    }
    return <Settings className="h-4 w-4" />;
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Settings className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{t("serviceRequest")}</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            الخطوة الرابعة: تقديم طلب الخدمة المحددة
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Service Request Form */}
        <div className="lg:col-span-2">
          <Card className="mobile-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className={isMobile ? "truncate" : ""}>طلب خدمة جديد</span>
              </CardTitle>
              <CardDescription>
                أنشئ طلب خدمة جديد مع تحديد نوع الخدمة والمتطلبات
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="mobile-form space-y-3 sm:space-y-4">
                {/* Request Information */}
                <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="requestNumber">رقم الطلب *</Label>
                    <Input
                      id="requestNumber"
                      value={formData.requestNumber}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serviceType">نوع الخدمة *</Label>
                    <Select value={formData.serviceType} onValueChange={(value) => handleInputChange("serviceType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع الخدمة" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((service) => (
                          <SelectItem key={service.value} value={service.value}>
                            <div className="flex items-center gap-2">
                              <service.icon className="h-4 w-4" />
                              {service.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">عنوان الطلب *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="أدخل عنواناً وصفياً للطلب"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">وصف تفصيلي للخدمة المطلوبة *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="اشرح تفاصيل الخدمة المطلوبة والمشكلة التي تحتاج حل..."
                    className="min-h-[100px] sm:min-h-[120px]"
                    required
                  />
                </div>

                {/* Scheduling Information */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                    الجدولة والأولوية
                  </h3>
                  <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="priority">الأولوية *</Label>
                      <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الأولوية" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="urgent">عاجل</SelectItem>
                          <SelectItem value="high">عالي</SelectItem>
                          <SelectItem value="medium">متوسط</SelectItem>
                          <SelectItem value="low">منخفض</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="requestedDate">التاريخ المطلوب *</Label>
                      <Input
                        id="requestedDate"
                        type="date"
                        value={formData.requestedDate}
                        onChange={(e) => handleInputChange("requestedDate", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferredTime">الوقت المفضل</Label>
                      <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange("preferredTime", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الوقت" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">صباحاً (8-12)</SelectItem>
                          <SelectItem value="afternoon">بعد الظهر (12-5)</SelectItem>
                          <SelectItem value="evening">مساءً (5-8)</SelectItem>
                          <SelectItem value="anytime">أي وقت</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Client Information */}  
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <User className="h-4 w-4 sm:h-5 sm:w-5" />
                    بيانات العميل
                  </h3>
                  <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="clientName">اسم العميل *</Label>
                      <Input
                        id="clientName"
                        value={formData.clientName}
                        onChange={(e) => handleInputChange("clientName", e.target.value)}
                        placeholder="أدخل اسم العميل"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clientEmail">البريد الإلكتروني *</Label>
                      <Input
                        id="clientEmail"
                        type="email"
                        value={formData.clientEmail}
                        onChange={(e) => handleInputChange("clientEmail", e.target.value)}
                        placeholder="client@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="clientPhone">رقم الهاتف *</Label>
                      <Input
                        id="clientPhone"
                        value={formData.clientPhone}
                        onChange={(e) => handleInputChange("clientPhone", e.target.value)}
                        placeholder="+966 50 123 4567"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">الموقع *</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        placeholder="العنوان أو الموقع المحدد"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Service Requirements */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold">متطلبات الخدمة</h3>
                  <div className="grid gap-2 sm:gap-3 grid-cols-1 sm:grid-cols-2">
                    {serviceRequirements.map((requirement) => (
                      <div key={requirement} className="flex items-center space-x-2 space-x-reverse">
                        <Checkbox
                          id={requirement}
                          checked={formData.requirements.includes(requirement)}
                          onCheckedChange={(checked: boolean) => 
                            handleRequirementChange(requirement, checked)
                          }
                        />
                        <Label 
                          htmlFor={requirement} 
                          className="text-xs sm:text-sm font-normal cursor-pointer"
                        >
                          {requirement}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="estimatedDuration">المدة المتوقعة</Label>
                    <Select value={formData.estimatedDuration} onValueChange={(value) => handleInputChange("estimatedDuration", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر المدة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2hours">1-2 ساعة</SelectItem>
                        <SelectItem value="half-day">نصف يوم</SelectItem>
                        <SelectItem value="full-day">يوم كامل</SelectItem>
                        <SelectItem value="2-3days">2-3 أيام</SelectItem>
                        <SelectItem value="week">أسبوع</SelectItem>
                        <SelectItem value="longer">أكثر من أسبوع</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="budget">الميزانية التقديرية</Label>
                    <Input
                      id="budget"
                      value={formData.budget}
                      onChange={(e) => handleInputChange("budget", e.target.value)}
                      placeholder="مثال: 5000 ر.س"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">ملاحظات إضافية</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="أضف أي ملاحظات أو متطلبات خاصة..."
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
                        إرسال طلب الخدمة
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Service Request History */}
        <div>
          <Card className="mobile-card">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">الطلبات السابقة</CardTitle>
              <CardDescription>
                آخر طلبات الخدمة المرسلة
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {sampleRequests.map((request) => (
                <div key={request.id} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 border rounded-lg">
                  <div className="flex flex-col items-center gap-1">
                    {getStatusIcon(request.status)}
                    {getServiceTypeIcon(request.serviceType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-xs sm:text-sm truncate">
                      {request.requestNumber}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {isMobile ? request.title.substring(0, 25) + '...' : request.title}
                    </p>
                    <div className="flex items-center gap-1 sm:gap-2 mt-2 flex-wrap">
                      {getStatusBadge(request.status)}
                      {getPriorityBadge(request.priority)}
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-muted-foreground">
                        {request.requestedDate}
                      </span>
                      <span className="text-xs text-muted-foreground truncate max-w-[100px]">
                        {request.clientName}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Service Stats */}
          <Card className="mobile-card mt-4 sm:mt-6">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">إحصائيات الخدمات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm">إجمالي الطلبات</span>
                <span className="font-semibold">{sampleRequests.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm">قيد التنفيذ</span>
                <span className="font-semibold text-blue-600">
                  {sampleRequests.filter(r => r.status === 'in_progress').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm">مكتملة</span>
                <span className="font-semibold text-green-600">
                  {sampleRequests.filter(r => r.status === 'completed').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm">في الانتظار</span>
                <span className="font-semibold text-orange-600">
                  {sampleRequests.filter(r => r.status === 'pending').length}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}