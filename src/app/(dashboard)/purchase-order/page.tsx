import { PageHeader } from '@/components/shared/page-header';
import { PurchaseOrderForm } from './purchase-order-form';

export default function PurchaseOrderPage() {
  return (
    <>
      <PageHeader
        title="Purchase Order Request"
        description="Submit a request for a new purchase for approval."
        className="mb-8"
      />
      <div className="max-w-2xl mx-auto">
        <PurchaseOrderForm />
      </div>
    </>
  );
}
