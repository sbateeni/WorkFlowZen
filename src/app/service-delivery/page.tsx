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
  Truck, 
  CheckCircle, 
  FileSignature, 
  Camera, 
  Upload, 
  Download, 
  Calendar, 
  Clock, 
  User, 
  MapPin,
  Star,
  AlertTriangle,
  ThumbsUp,
  MessageSquare
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useToast } from "@/hooks/use-toast";
import { useMobile } from "@/hooks/use-mobile";

interface ServiceDeliveryData {
  deliveryId: string;
  serviceRequestId: string;
  deliveryDate: string;
  deliveryTime: string;
  technician: string;
  clientName: string;
  location: string;
  serviceType: string;
  completionStatus: string;
  clientSignature: boolean;
  photosUploaded: boolean;
  deliverables: string[];
  clientFeedback: string;
  rating: number;
  issues: string;
  followUpRequired: boolean;
  notes: string;
}

const deliveryStatuses = [
  { value: "completed", label: "مكتمل بالكامل - Fully Completed", color: "success" },
  { value: "partial", label: "مكتمل جزئياً - Partially Completed", color: "warning" },
  { value: "pending", label: "في الانتظار - Pending", color: "secondary" },
  { value: "issues", label: "يحتاج متابعة - Needs Follow-up", color: "destructive" }
];

const sampleDeliveries = [
  {
    id: 1,
    deliveryId: "DEL-2024-001",
    serviceRequestId: "SR-2024-001",
    clientName: "شركة التقنيات المتقدمة",
    serviceType: "صيانة أنظمة الشبكة",
    status: "completed",
    deliveryDate: "2024-01-16",
    technician: "أحمد محمد",
    rating: 5
  },
  {
    id: 2,
    deliveryId: "DEL-2024-002",
    serviceRequestId: "SR-2024-002", 
    clientName: "Advanced Solutions Ltd",
    serviceType: "System Configuration",
    status: "partial",
    deliveryDate: "2024-01-18",
    technician: "Sarah Johnson",
    rating: 4
  },
  {
    id: 3,
    deliveryId: "DEL-2024-003",
    serviceRequestId: "SR-2024-003",
    clientName: "مؤسسة الأمان الشامل",
    serviceType: "استشارة أمنية",
    status: "issues",
    deliveryDate: "2024-01-15",
    technician: "محمد علي",
    rating: 3
  }
];

export default function ServiceDeliveryPage() {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const { isMobile } = useMobile();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ServiceDeliveryData>({
    deliveryId: `DEL-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
    serviceRequestId: "",
    deliveryDate: new Date().toISOString().split('T')[0],
    deliveryTime: "",
    technician: "",
    clientName: "",
    location: "",
    serviceType: "",
    completionStatus: "",
    clientSignature: false,
    photosUploaded: false,
    deliverables: [],
    clientFeedback: "",
    rating: 5,
    issues: "",
    followUpRequired: false,
    notes: ""
  });

  const handleInputChange = (field: keyof ServiceDeliveryData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDeliverableChange = (deliverable: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      deliverables: checked 
        ? [...prev.deliverables, deliverable]
        : prev.deliverables.filter(d => d !== deliverable)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "تم تأكيد تسليم الخدمة بنجاح",
        description: `رقم التسليم: ${formData.deliveryId}`,
      });
      
      // Reset form
      setFormData({
        deliveryId: `DEL-${new Date().getFullYear()}-${String(Date.now()).slice(-3)}`,
        serviceRequestId: "",
        deliveryDate: new Date().toISOString().split('T')[0],
        deliveryTime: "",
        technician: "",
        clientName: "",
        location: "",
        serviceType: "",
        completionStatus: "",
        clientSignature: false,
        photosUploaded: false,
        deliverables: [],
        clientFeedback: "",
        rating: 5,
        issues: "",
        followUpRequired: false,
        notes: ""
      });
    } catch (error) {
      toast({
        title: "خطأ في تأكيد التسليم",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusObj = deliveryStatuses.find(s => s.value === status);
    if (!statusObj) return <Badge variant="secondary">{status}</Badge>;
    
    return <Badge variant={statusObj.color as any}>{statusObj.label.split(' - ')[0]}</Badge>;
  };

  const renderStars = (rating: number, interactive: boolean = false) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating 
                ? "fill-yellow-400 text-yellow-400" 
                : "text-gray-300"
            } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
            onClick={interactive ? () => handleInputChange("rating", star) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Truck className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">{t("serviceDelivery")}</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            الخطوة الخامسة: تأكيد تسليم الخدمة للعميل
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
        {/* Service Delivery Form */}
        <div className="lg:col-span-2">
          <Card className="mobile-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className={isMobile ? "truncate" : ""}>تأكيد تسليم الخدمة</span>
              </CardTitle>
              <CardDescription>
                أكمل تفاصيل تسليم الخدمة وتأكيد إنجازها
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="mobile-form space-y-3 sm:space-y-4">
                {/* Delivery Information */}
                <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="deliveryId">رقم التسليم *</Label>
                    <Input
                      id="deliveryId"
                      value={formData.deliveryId}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serviceRequestId">رقم طلب الخدمة *</Label>
                    <Input
                      id="serviceRequestId"
                      value={formData.serviceRequestId}
                      onChange={(e) => handleInputChange("serviceRequestId", e.target.value)}
                      placeholder="SR-2024-XXX"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="deliveryDate">تاريخ التسليم *</Label>
                    <Input
                      id="deliveryDate"
                      type="date"
                      value={formData.deliveryDate}
                      onChange={(e) => handleInputChange("deliveryDate", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deliveryTime">وقت التسليم</Label>
                    <Input
                      id="deliveryTime"
                      type="time"
                      value={formData.deliveryTime}
                      onChange={(e) => handleInputChange("deliveryTime", e.target.value)}
                    />
                  </div>
                </div>

                {/* Service Details */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <User className="h-4 w-4 sm:h-5 sm:w-5" />
                    تفاصيل الخدمة
                  </h3>
                  <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="technician">اسم الفني *</Label>
                      <Input
                        id="technician"
                        value={formData.technician}
                        onChange={(e) => handleInputChange("technician", e.target.value)}
                        placeholder="أدخل اسم الفني المسؤول"
                        required
                      />
                    </div>
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
                  </div>
                  <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="location">الموقع *</Label>
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        placeholder="موقع تنفيذ الخدمة"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="serviceType">نوع الخدمة *</Label>
                      <Input
                        id="serviceType"
                        value={formData.serviceType}
                        onChange={(e) => handleInputChange("serviceType", e.target.value)}
                        placeholder="نوع الخدمة المنفذة"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Completion Status */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold">حالة الإنجاز</h3>
                  <div className="space-y-2">
                    <Label htmlFor="completionStatus">حالة إكمال الخدمة *</Label>
                    <Select value={formData.completionStatus} onValueChange={(value) => handleInputChange("completionStatus", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر حالة الإنجاز" />
                      </SelectTrigger>
                      <SelectContent>
                        {deliveryStatuses.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Verification Checklist */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold">قائمة التحقق</h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox
                        id="clientSignature"
                        checked={formData.clientSignature}
                        onCheckedChange={(checked) => handleInputChange("clientSignature", checked as boolean)}
                      />
                      <Label htmlFor="clientSignature" className="text-sm font-normal cursor-pointer">
                        تم الحصول على توقيع العميل
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox
                        id="photosUploaded"
                        checked={formData.photosUploaded}
                        onCheckedChange={(checked) => handleInputChange("photosUploaded", checked as boolean)}
                      />
                      <Label htmlFor="photosUploaded" className="text-sm font-normal cursor-pointer">
                        تم رفع صور العمل المنجز
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox
                        id="followUpRequired"
                        checked={formData.followUpRequired}
                        onCheckedChange={(checked) => handleInputChange("followUpRequired", checked as boolean)}
                      />
                      <Label htmlFor="followUpRequired" className="text-sm font-normal cursor-pointer">
                        يحتاج متابعة لاحقة
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Client Feedback */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                    تقييم العميل
                  </h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>تقييم الخدمة</Label>
                      <div className="flex items-center gap-2">
                        {renderStars(formData.rating, true)}
                        <span className="text-sm text-muted-foreground">({formData.rating}/5)</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clientFeedback">ملاحظات العميل</Label>
                      <Textarea
                        id="clientFeedback"
                        value={formData.clientFeedback}
                        onChange={(e) => handleInputChange("clientFeedback", e.target.value)}
                        placeholder="ملاحظات وتعليقات العميل على الخدمة..."
                        className="min-h-[80px] sm:min-h-[100px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Issues and Notes */}
                {formData.completionStatus === "issues" && (
                  <div className="space-y-2">
                    <Label htmlFor="issues">المشاكل أو القضايا *</Label>
                    <Textarea
                      id="issues"
                      value={formData.issues}
                      onChange={(e) => handleInputChange("issues", e.target.value)}
                      placeholder="اشرح المشاكل التي واجهتها أو تحتاج متابعة..."
                      className="min-h-[80px] sm:min-h-[100px]"
                      required
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="notes">ملاحظات إضافية</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="أي ملاحظات إضافية حول تسليم الخدمة..."
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
                        جاري التأكيد...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        تأكيد التسليم
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Delivery History */}
        <div>
          <Card className="mobile-card">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">عمليات التسليم السابقة</CardTitle>
              <CardDescription>
                آخر عمليات تسليم الخدمات
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              {sampleDeliveries.map((delivery) => (
                <div key={delivery.id} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 border rounded-lg">
                  <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-xs sm:text-sm truncate">
                      {delivery.deliveryId}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {isMobile ? delivery.serviceType.substring(0, 20) + '...' : delivery.serviceType}
                    </p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      {getStatusBadge(delivery.status)}
                      <div className="flex items-center gap-1">
                        {renderStars(delivery.rating)}
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-muted-foreground">
                        {delivery.deliveryDate}
                      </span>
                      <span className="text-xs text-muted-foreground truncate max-w-[100px]">
                        {delivery.technician}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Delivery Stats */}
          <Card className="mobile-card mt-4 sm:mt-6">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">إحصائيات التسليم</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm">إجمالي التسليمات</span>
                <span className="font-semibold">{sampleDeliveries.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm">مكتملة</span>
                <span className="font-semibold text-green-600">
                  {sampleDeliveries.filter(d => d.status === 'completed').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm">جزئية</span>
                <span className="font-semibold text-orange-600">
                  {sampleDeliveries.filter(d => d.status === 'partial').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm">متوسط التقييم</span>
                <div className="flex items-center gap-1">
                  {renderStars(Math.round(sampleDeliveries.reduce((sum, d) => sum + d.rating, 0) / sampleDeliveries.length))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}