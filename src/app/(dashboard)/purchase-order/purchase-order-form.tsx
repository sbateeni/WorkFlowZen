'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const purchaseOrderSchema = z.object({
  item: z.string().min(3, 'Item name must be at least 3 characters.'),
  quantity: z.coerce.number().min(1, 'Quantity must be at least 1.'),
  price: z.coerce.number().min(0.01, 'Price must be greater than 0.'),
  vendor: z.string().min(2, 'Vendor name is required.'),
  justification: z.string().min(10, 'Please provide a brief justification (min. 10 characters).'),
});

type PurchaseOrderFormValues = z.infer<typeof purchaseOrderSchema>;

export function PurchaseOrderForm() {
  const { toast } = useToast();
  const form = useForm<PurchaseOrderFormValues>({
    resolver: zodResolver(purchaseOrderSchema),
    defaultValues: {
      item: '',
      quantity: 1,
      price: 0,
      vendor: '',
      justification: '',
    },
  });

  function onSubmit(data: PurchaseOrderFormValues) {
    console.log(data);
    toast({
      title: 'Purchase Order Submitted',
      description: 'Your request has been sent for approval.',
      variant: 'default',
      className: 'bg-accent text-accent-foreground border-accent',
    });
    form.reset();
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>New Purchase Order</CardTitle>
        <CardDescription>All purchase requests require administrator approval.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="item"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item / Service Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., New Office Chairs" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                        <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Unit Price</FormLabel>
                    <FormControl>
                        <Input type="number" step="0.01" placeholder="e.g., 150.00" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <FormField
              control={form.control}
              name="vendor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vendor</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Office Supplies Co." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="justification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Justification</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Briefly explain why this purchase is needed." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              <Send className="w-4 h-4 mr-2" />
              Submit for Approval
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
