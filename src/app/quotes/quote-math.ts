import { QuoteInput } from '../models/quote';

export interface QuoteBreakdown {
  labor: number;
  margin: number;
  expenses: number;
  total: number;
  effectiveRate: number;
}

const toCents = (n: number) => Math.round(n * 100) / 100;

/** Margin applies to labor only; expenses pass through at cost. */
export function calculateQuote({
  hourlyRate,
  hours,
  expenses,
  marginPercent,
}: QuoteInput): QuoteBreakdown {
  const labor = hours * hourlyRate;
  const margin = labor * (marginPercent / 100);
  const total = labor + margin + expenses;
  return {
    labor: toCents(labor),
    margin: toCents(margin),
    expenses: toCents(expenses),
    total: toCents(total),
    effectiveRate: toCents(total / hours),
  };
}
