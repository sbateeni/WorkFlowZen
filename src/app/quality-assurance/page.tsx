"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, RefreshCw } from "lucide-react";

export default function QualityAssurancePage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">التحقق من الجودة والمراجعة</h1>
          <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
            الخطوة 17: نظام ضمان الجودة ومراجعة العمليات
          </p>
        </div>
        <Button variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" /> تحديث
        </Button>
      </div>

      <Card className="mobile-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" /> قائمة التحقق
          </CardTitle>
          <CardDescription>تحقق من اكتمال المتطلبات ومعايير الجودة.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-md">
            <span>مراجعة الوثائق</span>
            <Badge variant="secondary">قيد المراجعة</Badge>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-md">
            <span>اختبارات القبول</span>
            <Badge variant="secondary">غير مكتمل</Badge>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-md">
            <span>مطابقة المتطلبات</span>
            <Badge variant="secondary">غير مكتمل</Badge>
          </div>
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline">حفظ</Button>
            <Button>
              اعتماد <CheckCircle className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mobile-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-600" /> ملاحظات وتحسينات
          </CardTitle>
          <CardDescription>سجل الملاحظات وخطط التحسين.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">واجهة مبدئية قابلة للتوسعة.</p>
        </CardContent>
      </Card>
    </div>
  );
}


