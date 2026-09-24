/**
 * A saved quote. Rate and results are snapshotted at save time, so history
 * stays accurate even if the rate for later quotes changes.
 */
export interface Quote {
  id: string;
  dealId: string;
  hourlyRate: number;
  hours: number;
  expenses: number;
  marginPercent: number;
  total: number;
  /** total / hours: what the client effectively pays per hour. */
  effectiveRate: number;
  /** ISO timestamp. */
  createdAt: string;
}

export type QuoteInput = Pick<Quote, 'hourlyRate' | 'hours' | 'expenses' | 'marginPercent'>;
