"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Bell, ShieldAlert } from "lucide-react";

export default function RiskManagementPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">إدارة المخاطر وتنبيهات الامتثال</h1>
        <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
          الخطوة 18: مراقبة المخاطر وإشعارات الامتثال.
        </p>
      </div>

      <Card className="mobile-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" /> المخاطر الحالية
          </CardTitle>
          <CardDescription>قائمة بالمخاطر المكتشفة حديثًا.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-md">
            <span>تجاوز الميزانية</span>
            <Badge variant="destructive">مرتفع</Badge>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-md">
            <span>تأخير التسليم</span>
            <Badge variant="secondary">متوسط</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="mobile-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-yellow-600" /> الامتثال
          </CardTitle>
          <CardDescription>مؤشرات وتعليمات الامتثال.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Bell className="h-4 w-4" /> نظام تنبيهات قابل للتوسعة.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


