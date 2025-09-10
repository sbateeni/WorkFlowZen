'use server';

/**
 * @fileOverview Flow for validating invoice data to ensure all necessary details are present before submitting a payment request.
 *
 * - validateInvoiceData - A function that validates invoice data.
 * - ValidateInvoiceDataInput - The input type for the validateInvoiceData function.
 * - ValidateInvoiceDataOutput - The return type for the validateInvoiceData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateInvoiceDataInputSchema = z.object({
  invoiceText: z
    .string()
    .describe('The invoice text to validate, extracted via OCR from the invoice image.')
});
export type ValidateInvoiceDataInput = z.infer<typeof ValidateInvoiceDataInputSchema>;

const ValidateInvoiceDataOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the invoice contains all necessary details.'),
  missingDetails: z.array(z.string()).describe('List of missing details, if any.'),
  confidence: z.number().describe('Confidence level in the validation result (0-1).'),
});
export type ValidateInvoiceDataOutput = z.infer<typeof ValidateInvoiceDataOutputSchema>;

export async function validateInvoiceData(input: ValidateInvoiceDataInput): Promise<ValidateInvoiceDataOutput> {
  return validateInvoiceDataFlow(input);
}

const validateInvoiceDataPrompt = ai.definePrompt({
  name: 'validateInvoiceDataPrompt',
  input: {
    schema: ValidateInvoiceDataInputSchema,
  },
  output: {
    schema: ValidateInvoiceDataOutputSchema,
  },
  prompt: `You are an expert invoice validator.
  Your task is to determine if the provided invoice text contains all necessary details for payment processing.
  The necessary details are: invoice number, invoice date, amount due, and vendor information (name and contact).

  Invoice Text: {{{invoiceText}}}

  Determine if the invoice contains all the required details. If any details are missing, list them in the missingDetails array.
  Provide a confidence level (0-1) for your validation.
  `,
});

const validateInvoiceDataFlow = ai.defineFlow(
  {
    name: 'validateInvoiceDataFlow',
    inputSchema: ValidateInvoiceDataInputSchema,
    outputSchema: ValidateInvoiceDataOutputSchema,
  },
  async input => {
    const {output} = await validateInvoiceDataPrompt(input);
    return output!;
  }
);
