import { PageHeader } from '@/components/shared/page-header';
import { ConsultationForm } from './consultation-form';

export default function ConsultationPage() {
  return (
    <>
      <PageHeader
        title="Consultation Request"
        description="Send a consultation request via email."
        className="mb-8"
      />
      <div className="max-w-2xl mx-auto">
        <ConsultationForm />
      </div>
    </>
  );
}
