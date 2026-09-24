import { Deal } from '../models/deal';
import { daysFromToday } from '../shared/dates';

/** Deals due within this many days (inclusive of today) are flagged as upcoming. */
export const UPCOMING_WINDOW_DAYS = 3;

export type DueState = 'overdue' | 'upcoming' | null;

/**
 * Mirrors the pipeline spreadsheet's conditional formatting. Closed deals
 * (Won/Lost) are never flagged. YYYY-MM-DD strings compare correctly as text.
 */
export function dueState(deal: Deal): DueState {
  if (deal.status === 'Won' || deal.status === 'Lost') return null;
  if (deal.nextActionDate < daysFromToday(0)) return 'overdue';
  if (deal.nextActionDate <= daysFromToday(UPCOMING_WINDOW_DAYS)) return 'upcoming';
  return null;
}
