import { PageHeader } from '@/components/shared/page-header';
import { WorkflowStep } from '@/components/workflow-step';
import {
  MailQuestion,
  ClipboardList,
  CheckCircle2,
  FileText,
  Banknote,
  Briefcase,
} from 'lucide-react';

const workflowSteps = [
  {
    icon: MailQuestion,
    title: 'Consultation Request',
    subtitle: 'إرسال إيميل استشارة',
    isCompleted: true,
  },
  {
    icon: ClipboardList,
    title: 'Service Request',
    subtitle: 'طلب الخدمة',
    isCompleted: true,
  },
  {
    icon: CheckCircle2,
    title: 'Service Delivery',
    subtitle: 'تسليم الخدمة',
    isCurrent: true,
  },
  {
    icon: FileText,
    title: 'Receive Invoice',
    subtitle: 'استلام الفاتورة',
  },
  {
    icon: Banknote,
    title: 'Payment Request',
    subtitle: 'عمل طلب الدفع',
  },
  {
    icon: Briefcase,
    title: 'Send to Accounting',
    subtitle: 'إرسال الملف للمحاسبة',
  },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-4">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's your workflow overview."
        className="mb-12"
      />
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 font-headline text-center">
          Your Current Workflow Status
        </h2>
        <div className="space-y-0">
          {workflowSteps.map((step, index) => (
            <WorkflowStep
              key={step.title}
              icon={step.icon}
              title={step.title}
              subtitle={step.subtitle}
              isCompleted={step.isCompleted}
              isCurrent={step.isCurrent}
              isLast={index === workflowSteps.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
