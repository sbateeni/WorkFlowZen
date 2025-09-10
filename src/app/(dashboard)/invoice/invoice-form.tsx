'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Save, Upload } from 'lucide-react';

export function InvoiceForm() {
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: 'Invoice Saved',
      description: 'The invoice details have been successfully saved.',
      variant: 'default',
      className: 'bg-accent text-accent-foreground border-accent',
    });
    (event.target as HTMLFormElement).reset();
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Enter Invoice Details</CardTitle>
        <CardDescription>Provide the invoice information for record keeping.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="invoice-number">Invoice Number</Label>
            <Input id="invoice-number" placeholder="e.g., INV-2024-001" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount Due</Label>
              <Input id="amount" type="number" placeholder="e.g., 1250.50" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="invoice-date">Invoice Date</Label>
              <Input id="invoice-date" type="date" required />
            </div>
          </div>
           <div className="space-y-2">
              <Label htmlFor="invoice-file">Invoice Document</Label>
              <div className="flex items-center justify-center w-full">
                <Label htmlFor="invoice-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-secondary">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-muted-foreground"/>
                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-muted-foreground">PDF, PNG, JPG (MAX. 10MB)</p>
                    </div>
                    <Input id="invoice-file" type="file" className="hidden" />
                </Label>
              </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit">
            <Save className="w-4 h-4 mr-2" />
            Save Invoice
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
