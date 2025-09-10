'use server';

import {
  validateInvoiceData,
  type ValidateInvoiceDataInput,
  type ValidateInvoiceDataOutput,
} from '@/ai/flows/validate-invoice-data';

export async function handleInvoiceValidation(
  data: ValidateInvoiceDataInput
): Promise<ValidateInvoiceDataOutput> {
  try {
    const result = await validateInvoiceData(data);
    return result;
  } catch (error) {
    console.error('Error validating invoice:', error);
    return {
      isValid: false,
      missingDetails: ['An unexpected error occurred during validation.'],
      confidence: 0,
    };
  }
}
