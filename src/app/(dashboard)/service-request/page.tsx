import { PageHeader } from '@/components/shared/page-header';
import { ServiceRequestForm } from './service-request-form';

export default function ServiceRequestPage() {
  return (
    <>
      <PageHeader
        title="Service Request"
        description="Submit a request for a specific service with its details."
        className="mb-8"
      />
      <div className="max-w-2xl mx-auto">
        <ServiceRequestForm />
      </div>
    </>
  );
}
