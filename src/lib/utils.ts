import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount: number,
  currency: string = "ILS",
  locale: string = "ar"
): string {
  if (Number.isNaN(amount) || !Number.isFinite(amount)) {
    return "₪0.00";
  }
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      currencyDisplay: "symbol",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    const formatted = amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const symbol = currency === "ILS" ? "₪" : "";
    return `${symbol} ${formatted}`.trim();
  }
}