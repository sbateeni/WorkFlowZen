import { PageHeader } from '@/components/shared/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

export default function AccountingPage() {
  return (
    <>
      <PageHeader
        title="Accounting"
        description="Final step for approved payment requests."
        className="mb-8"
      />
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Briefcase className="h-8 w-8 text-muted-foreground" />
          <CardTitle>Sent to Accounting</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This is where you would see a list of all payment requests that have
            been fully approved and sent to the accounting department for final
            processing and payment. Integration with accounting software could
            show the final payment status here.
          </p>
        </CardContent>
      </Card>
    </>
  );
}
