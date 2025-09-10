import { PageHeader } from '@/components/shared/page-header';
import { PaymentRequestClient } from './payment-request-client';

export default function PaymentRequestPage() {
  return (
    <>
      <PageHeader
        title="Payment Request"
        description="Create a payment request from a submitted invoice."
        className="mb-8"
      />
      <div className="max-w-4xl mx-auto">
        <PaymentRequestClient />
      </div>
    </>
  );
}
