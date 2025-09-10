"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, 
  Search, 
  Plus, 
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  Settings
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useMobile } from "@/hooks/use-mobile";

interface EmployeeRequest {
  id: number;
  employeeName: string;
  employeeId: string;
  department: string;
  requestType: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "pending" | "approved" | "rejected" | "in_progress" | "completed";
  submittedAt: string;
  assignedTo: string;
  expectedCompletion: string;
  tags: string[];
}

const sampleRequests: EmployeeRequest[] = [
  {
    id: 1,
    employeeName: "أحمد محمد علي",
    employeeId: "EMP-001",
    department: "تقنية المعلومات",
    requestType: "إجازة",
    title: "طلب إجازة سنوية",
    description: "طلب إجازة سنوية لمدة أسبوعين من تاريخ 15 فبراير",
    priority: "medium",
    status: "approved",
    submittedAt: "2024-01-20",
    assignedTo: "مدير الموارد البشرية",
    expectedCompletion: "2024-01-22",
    tags: ["إجازة", "سنوية", "موافقة"]
  },
  {
    id: 2,
    employeeName: "Sarah Johnson",
    employeeId: "EMP-045",
    department: "Human Resources",
    requestType: "تدريب",
    title: "Training Request - Project Management",
    description: "Request for PMP certification training course",
    priority: "high",
    status: "pending",
    submittedAt: "2024-01-21",
    assignedTo: "Training Department",
    expectedCompletion: "2024-01-25",
    tags: ["training", "pmp", "certification"]
  }
];

export default function EmployeePortalPage() {
  const { t, isRTL } = useLanguage();
  const { isMobile } = useMobile();
  const [requests] = useState<EmployeeRequest[]>(sampleRequests);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="warning">معلق</Badge>;
      case "approved":
        return <Badge variant="success">موافق</Badge>;
      case "rejected":
        return <Badge variant="destructive">مرفوض</Badge>;
      case "in_progress":
        return <Badge variant="pending">جاري المعالجة</Badge>;
      case "completed":
        return <Badge variant="success">مكتمل</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "approved":
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "in_progress":
        return <Settings className="h-4 w-4 text-blue-500 animate-spin" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const requestStats = {
    total: requests.length,
    pending: requests.filter(r => r.status === "pending").length,
    approved: requests.filter(r => r.status === "approved").length,
    completed: requests.filter(r => r.status === "completed").length
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <User className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">{t("employeePortal")}</h1>
            <p className="text-muted-foreground">
              الخطوة الرابعة عشرة: بوابة الخدمة الذاتية للموظفين
            </p>
          </div>
        </div>
        <Button size={isMobile ? "sm" : "default"}>
          <Plus className="h-4 w-4 mr-2" />
          طلب جديد
        </Button>
      </div>

      {/* Request Statistics */}
      <div className="grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-4">
        <Card className="mobile-card">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium truncate">إجمالي الطلبات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-primary">{requestStats.total}</div>
            <p className="text-xs text-muted-foreground">طلب</p>
          </CardContent>
        </Card>
        
        <Card className="mobile-card">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium truncate">معلقة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-yellow-600">{requestStats.pending}</div>
            <p className="text-xs text-muted-foreground">معلق</p>
          </CardContent>
        </Card>
        
        <Card className="mobile-card">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium truncate">موافق عليها</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-green-600">{requestStats.approved}</div>
            <p className="text-xs text-muted-foreground">موافق</p>
          </CardContent>
        </Card>
        
        <Card className="mobile-card">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium truncate">مكتملة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-green-600">{requestStats.completed}</div>
            <p className="text-xs text-muted-foreground">مكتمل</p>
          </CardContent>
        </Card>
      </div>

      {/* Employee Requests */}
      <Card className="mobile-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
            طلبات الموظفين
          </CardTitle>
          <CardDescription>
            عرض وإدارة جميع طلبات الموظفين
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {requests.map((request) => (
            <div key={request.id} className="flex items-start gap-3 p-4 border rounded-lg">
              {getStatusIcon(request.status)}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-medium text-sm">{request.title}</p>
                  {getStatusBadge(request.status)}
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {request.employeeName} - {request.department}
                </p>
                <p className="text-xs text-muted-foreground truncate mb-2">
                  {request.description}
                </p>
                <div className="flex gap-2 text-xs text-muted-foreground">
                  <span>تاريخ الإرسال: {request.submittedAt}</span>
                  <span>•</span>
                  <span>المسؤول: {request.assignedTo}</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}