import { PageHeader } from '@/components/shared/page-header';
import { InvoiceForm } from './invoice-form';

export default function InvoicePage() {
  return (
    <>
      <PageHeader
        title="Invoice Information Capture"
        description="Upload or enter details for received invoices."
        className="mb-8"
      />
      <div className="max-w-2xl mx-auto">
        <InvoiceForm />
      </div>
    </>
  );
}
