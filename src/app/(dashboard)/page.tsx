import { PageHeader } from '@/components/shared/page-header';
import { WorkflowStep } from '@/components/workflow-step';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  MailQuestion,
  Database,
  ShoppingBasket,
  ClipboardList,
  CheckCircle2,
  FileText,
  Banknote,
  CheckCircle,
  Briefcase,
  Download,
  Bell,
  Settings,
} from 'lucide-react';

const workflowSteps = [
  {
    id: 'consultation',
    icon: MailQuestion,
    title: 'Consultation Email',
    titleAr: 'إرسال إيميل استشارة',
    href: '/consultation',
    isCompleted: true,
    order: 1,
  },
  {
    id: 'data-entry',
    icon: Database,
    title: 'Data & Documents Entry',
    titleAr: 'إدخال البيانات والوثائق',
    href: '/data-entry',
    isCompleted: true,
    order: 2,
  },
  {
    id: 'purchase-order',
    icon: ShoppingBasket,
    title: 'Purchase Order Request',
    titleAr: 'طلب أمر الشراء',
    href: '/purchase-order',
    isCompleted: true,
    order: 3,
  },
  {
    id: 'service-request',
    icon: ClipboardList,
    title: 'Service Request',
    titleAr: 'طلب الخدمة',
    href: '/service-request',
    isCurrent: true,
    order: 4,
  },
  {
    id: 'service-delivery',
    icon: CheckCircle2,
    title: 'Service Delivery',
    titleAr: 'تسليم الخدمة',
    href: '/service-delivery',
    order: 5,
  },
  {
    id: 'invoice-receipt',
    icon: FileText,
    title: 'Invoice Receipt',
    titleAr: 'استلام الفاتورة',
    href: '/invoice',
    order: 6,
  },
  {
    id: 'payment-request',
    icon: Banknote,
    title: 'Payment Request',
    titleAr: 'عمل طلب الدفع',
    href: '/payment-request',
    order: 7,
  },
  {
    id: 'payment-approval',
    icon: CheckCircle,
    title: 'Payment Approval',
    titleAr: 'استلام موافقة الدفع',
    href: '/payment-approval',
    order: 8,
  },
  {
    id: 'accounting',
    icon: Briefcase,
    title: 'Send to Accounting',
    titleAr: 'إرسال الملف للمحاسبة',
    href: '/accounting',
    order: 9,
  },
];

const quickActions = [
  {
    title: 'Download Reports',
    titleAr: 'تحميل التقارير',
    icon: Download,
    href: '/reports',
    description: 'Generate PDF/Excel reports',
    descriptionAr: 'إنشاء تقارير PDF/Excel',
  },
  {
    title: 'Notifications',
    titleAr: 'الإشعارات',
    icon: Bell,
    href: '/notifications',
    description: 'View email alerts & notifications',
    descriptionAr: 'عرض التنبيهات والإشعارات',
  },
  {
    title: 'User Management',
    titleAr: 'إدارة المستخدمين',
    icon: Settings,
    href: '/users',
    description: 'Manage users & permissions',
    descriptionAr: 'إدارة المستخدمين والصلاحيات',
  },
];

export default function DashboardPage() {
  const currentStep = workflowSteps.find(step => step.isCurrent);
  const completedSteps = workflowSteps.filter(step => step.isCompleted).length;
  const totalSteps = workflowSteps.length;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  return (
    <div className="container mx-auto py-4 space-y-6">
      <PageHeader
        title="لوحة التحكم - Dashboard"
        description="مرحباً بك! إليك نظرة عامة على سير العمل - Welcome back! Here's your workflow overview."
        className="mb-8"
      />
      
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">المهام المكتملة - Completed Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{completedSteps}</div>
            <div className="text-sm text-gray-500">من أصل {totalSteps} مهام - out of {totalSteps} tasks</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">التقدم - Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{Math.round(progressPercentage)}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">المهمة الحالية - Current Task</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              {currentStep && (
                <>
                  <currentStep.icon className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="font-medium">{currentStep.title}</div>
                    <div className="text-sm text-gray-500">{currentStep.titleAr}</div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workflow Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">سير العمل - Workflow Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {workflowSteps.map((step, index) => (
              <WorkflowStep
                key={step.id}
                icon={step.icon}
                title={step.title}
                subtitle={step.titleAr}
                isCompleted={step.isCompleted}
                isCurrent={step.isCurrent}
                isLast={index === workflowSteps.length - 1}
                href={step.href}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">إجراءات سريعة - Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <Link key={action.href} href={action.href}>
                <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <action.icon className="h-6 w-6 text-blue-600 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-medium">{action.title}</h3>
                      <p className="text-sm text-gray-600 mb-1">{action.titleAr}</p>
                      <p className="text-xs text-gray-500">{action.description}</p>
                      <p className="text-xs text-gray-500">{action.descriptionAr}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
