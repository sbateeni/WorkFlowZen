"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Target, Activity, TrendingUp } from "lucide-react";
import { Trash2 } from "lucide-react";
import { useDatabase } from "@/components/providers/database-provider";
import dbService from "@/lib/indexeddb";

export default function ExecutiveDashboardPage() {
  const { clearAllData } = useDatabase();
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">لوحة المدراء ومؤشرات الأداء</h1>
          <p className="text-muted-foreground mt-1 sm:mt-2 text-sm sm:text-base">
            الخطوة 19: متابعة مؤشرات الأداء الرئيسية.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="mobile-button" onClick={async () => {
            await clearAllData();
            if (typeof window !== 'undefined') window.location.reload();
          }}>
            <Trash2 className="h-4 w-4 mr-1" />
            إعادة ضبط البيانات
          </Button>
          <Button variant="outline" size="sm" className="mobile-button" onClick={async () => {
            const payload = await dbService.exportAll();
            const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `workflowzen-backup-${new Date().toISOString()}.json`;
            a.click();
            URL.revokeObjectURL(url);
          }}>
            تنزيل نسخة احتياطية
          </Button>
          <label className="inline-flex items-center">
            <input
              type="file"
              accept="application/json"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const text = await file.text();
                const bundle = JSON.parse(text);
                await dbService.importAll(bundle);
                if (typeof window !== 'undefined') window.location.reload();
              }}
            />
            <Button asChild variant="outline" size="sm" className="mobile-button">
              <span role="button">استعادة نسخة</span>
            </Button>
          </label>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="mobile-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-green-600" /> نمو الإيرادات</CardTitle>
            <CardDescription>آخر 6 أشهر</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.5%</div>
          </CardContent>
        </Card>

        <Card className="mobile-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-blue-600" /> معدل الإنجاز</CardTitle>
            <CardDescription>مؤشر الأداء</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91.5%</div>
          </CardContent>
        </Card>

        <Card className="mobile-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5 text-purple-600" /> نشاط المستخدمين</CardTitle>
            <CardDescription>المستخدمون النشطون</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,681</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mobile-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BarChart3 className="h-5 w-5" /> لمحة تنفيذية</CardTitle>
          <CardDescription>ملخص قابل للتوسعة لاحقًا.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">لوحة تنفيذية مبدئية.</div>
        </CardContent>
      </Card>
    </div>
  );
}


