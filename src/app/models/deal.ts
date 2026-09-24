export const DEAL_STATUSES = ['Lead', 'Contacted', 'Quoted', 'Won', 'Lost'] as const;

export type DealStatus = (typeof DEAL_STATUSES)[number];

export type FitScore = 1 | 2 | 3 | 4 | 5;

export interface Deal {
  id: string;
  clientName: string;
  status: DealStatus;
  fitScore: FitScore;
  /** Calendar date as YYYY-MM-DD, matching <input type="date">. */
  nextActionDate: string;
  notes: string;
  /** ISO timestamp. */
  createdAt: string;
}

/** Fields the user supplies; id and createdAt are assigned by DealService. */
export type DealInput = Omit<Deal, 'id' | 'createdAt'>;
