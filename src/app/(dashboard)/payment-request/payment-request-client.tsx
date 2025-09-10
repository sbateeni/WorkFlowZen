'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  Send,
  Sparkles,
} from 'lucide-react';
import { handleInvoiceValidation } from './actions';
import type { ValidateInvoiceDataOutput } from '@/ai/flows/validate-invoice-data';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

export function PaymentRequestClient() {
  const [invoiceText, setInvoiceText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validationResult, setValidationResult] =
    useState<ValidateInvoiceDataOutput | null>(null);
  const { toast } = useToast();

  const handleValidate = async () => {
    if (!invoiceText.trim()) {
      toast({
        title: 'Input Required',
        description: 'Please paste the invoice text before validating.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setValidationResult(null);
    try {
      const result = await handleInvoiceValidation({ invoiceText });
      setValidationResult(result);
    } catch (error) {
      toast({
        title: 'Validation Failed',
        description:
          'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: 'Payment Request Submitted',
      description: 'Your request has been sent for approval.',
      variant: 'default',
      className: 'bg-accent text-accent-foreground border-accent',
    });
    setInvoiceText('');
    setValidationResult(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>New Payment Request</CardTitle>
            <CardDescription>
              Paste text from an invoice to validate and create a payment
              request.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="invoice-text">Invoice Text (from OCR)</Label>
              <Textarea
                id="invoice-text"
                placeholder="Paste the full text from the invoice here..."
                rows={10}
                value={invoiceText}
                onChange={(e) => setInvoiceText(e.target.value)}
                required
              />
            </div>
            <Button
              type="button"
              onClick={handleValidate}
              disabled={isLoading || !invoiceText.trim()}
              className="w-full"
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Analyze Invoice with AI
            </Button>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              type="submit"
              disabled={!validationResult?.isValid}
            >
              <Send className="mr-2 h-4 w-4" />
              Submit Payment Request
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold font-headline">Validation Results</h3>
        {isLoading && (
            <div className="flex items-center justify-center rounded-lg border h-64 bg-card">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-muted-foreground">Analyzing...</p>
                </div>
            </div>
        )}
        {validationResult && (
          <Card>
            <CardHeader>
              <CardTitle>Analysis Complete</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <Label>Confidence Score</Label>
                    <span className="text-sm font-bold text-foreground">
                        {(validationResult.confidence * 100).toFixed(0)}%
                    </span>
                </div>
                <Progress value={validationResult.confidence * 100} className="h-2" />
              </div>

              {validationResult.isValid ? (
                <Alert className="border-accent bg-accent/10">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  <AlertTitle className="text-accent">
                    Validation Successful
                  </AlertTitle>
                  <AlertDescription>
                    All necessary details seem to be present. You can proceed with the payment request.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Validation Failed</AlertTitle>
                  <AlertDescription>
                    The following details appear to be missing or unclear:
                    <ul className="mt-2 list-disc list-inside space-y-1">
                      {validationResult.missingDetails.map((detail, i) => (
                        <li key={i}>{detail}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        )}
        {!isLoading && !validationResult && (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed h-64 bg-card">
                <Sparkles className="h-12 w-12 text-muted-foreground/50 mb-4"/>
                <p className="text-center text-muted-foreground">
                    AI validation results will appear here.
                </p>
            </div>
        )}
      </div>
    </div>
  );
}
