"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Mail, Send, Clock, CheckCircle } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useToast } from "@/hooks/use-toast";
import { useMobile } from "@/hooks/use-mobile";

interface ConsultationData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  company: string;
  subject: string;
  message: string;
  priority: string;
  language: string;
  expectedResponse: string;
}

const consultationHistory = [
  {
    id: 1,
    clientName: "أحمد محمد",
    subject: "استشارة تقنية حول النظام",
    status: "completed",
    createdAt: "2024-01-15",
    responseTime: "2 ساعة",
  },
  {
    id: 2,
    clientName: "Sarah Johnson",
    subject: "System Integration Consultation",
    status: "pending",
    createdAt: "2024-01-16",
    responseTime: "منتظر",
  },
  {
    id: 3,
    clientName: "محمد علي",
    subject: "استشارة مالية",
    status: "in_progress",
    createdAt: "2024-01-16",
    responseTime: "قيد المعالجة",
  },
];

export default function ConsultationPage() {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const { isMobile } = useMobile();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ConsultationData>({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    company: "",
    subject: "",
    message: "",
    priority: "",
    language: "ar",
    expectedResponse: "",
  });

  const handleInputChange = (field: keyof ConsultationData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "تم إرسال الاستشارة بنجاح",
        description: "سيتم الرد عليك في أقرب وقت ممكن",
      });
      
      // Reset form
      setFormData({
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        company: "",
        subject: "",
        message: "",
        priority: "",
        language: "ar",
        expectedResponse: "",
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
      case "pending":
        return <Badge variant="pending">في الانتظار</Badge>;
      case "in_progress":
        return <Badge variant="warning">قيد المعالجة</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-orange-500" />;
      case "in_progress":
        return <Mail className="h-4 w-4 text-blue-500" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Mail className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">{t("consultation")}</h1>
            <p className="text-muted-foreground">
              الخطوة الأولى: إرسال إيميل استشارة للعميل
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          {/* Consultation Form */}
          <div className="lg:col-span-2">
            <Card className="mobile-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className={isMobile ? "truncate" : ""}>نموذج الاستشارة الجديدة</span>
                </CardTitle>
                <CardDescription>
                  املأ البيانات المطلوبة لإرسال طلب استشارة جديد
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="mobile-form space-y-3 sm:space-y-4">
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
                      <Label htmlFor="clientPhone">رقم الهاتف</Label>
                      <Input
                        id="clientPhone"
                        value={formData.clientPhone}
                        onChange={(e) => handleInputChange("clientPhone", e.target.value)}
                        placeholder="+966 50 123 4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">الشركة</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        placeholder="اسم الشركة"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">موضوع الاستشارة *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      placeholder="أدخل موضوع الاستشارة"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">تفاصيل الاستشارة *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="اكتب تفاصيل الاستشارة هنا..."
                      className="min-h-[100px]"
                      required
                    />
                  </div>

                  <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="priority">الأولوية</Label>
                      <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الأولوية" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">منخفضة</SelectItem>
                          <SelectItem value="medium">متوسطة</SelectItem>
                          <SelectItem value="high">عالية</SelectItem>
                          <SelectItem value="urgent">عاجل</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="language">لغة التواصل</Label>
                      <Select value={formData.language} onValueChange={(value) => handleInputChange("language", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر اللغة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ar">العربية</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="both">كلاهما</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="expectedResponse">وقت الرد المتوقع</Label>
                      <Select value={formData.expectedResponse} onValueChange={(value) => handleInputChange("expectedResponse", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الوقت" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1hour">خلال ساعة</SelectItem>
                          <SelectItem value="4hours">خلال 4 ساعات</SelectItem>
                          <SelectItem value="24hours">خلال 24 ساعة</SelectItem>
                          <SelectItem value="48hours">خلال 48 ساعة</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

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
                          إرسال الاستشارة
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Consultation History */}
          <div>
            <Card className="mobile-card">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">الاستشارات السابقة</CardTitle>
                <CardDescription>
                  آخر الاستشارات المرسلة
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {consultationHistory.map((consultation) => (
                  <div key={consultation.id} className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 border rounded-lg">
                    {getStatusIcon(consultation.status)}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-xs sm:text-sm truncate">
                        {consultation.clientName}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {isMobile ? consultation.subject.substring(0, 30) + '...' : consultation.subject}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        {getStatusBadge(consultation.status)}
                        <span className="text-xs text-muted-foreground">
                          {consultation.createdAt}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        وقت الرد: {consultation.responseTime}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
    </div>
  );
}