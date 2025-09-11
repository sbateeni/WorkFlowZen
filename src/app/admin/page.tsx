"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Users, Shield } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">إدارة النظام والإعدادات</h1>
          <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
            الخطوة 20: إدارة المستخدمين، الأدوار، والإعدادات العامة.
          </p>
        </div>
        <Button>حفظ الإعدادات</Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="mobile-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" /> إدارة المستخدمين</CardTitle>
            <CardDescription>إضافة/تعديل المستخدمين والأدوار.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">واجهة مبدئية قابلة للتوسعة.</div>
          </CardContent>
        </Card>
        <Card className="mobile-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" /> السياسات والأمان</CardTitle>
            <CardDescription>ضبط السياسات وإعدادات الأمان.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">واجهة مبدئية قابلة للتوسعة.</div>
          </CardContent>
        </Card>
        <Card className="mobile-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Settings className="h-5 w-5" /> الإعدادات العامة</CardTitle>
            <CardDescription>تخصيص سلوك النظام.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">واجهة مبدئية قابلة للتوسعة.</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


