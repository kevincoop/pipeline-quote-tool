import { DealInput } from '../models/deal';

/** Offsets a date from today, returned as YYYY-MM-DD in local time. */
function daysFromToday(offset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function sampleDeals(): DealInput[] {
  return [
    {
      clientName: 'Harbor Dental Group',
      status: 'Lead',
      fitScore: 4,
      nextActionDate: daysFromToday(-2),
      notes: 'Referral. Site rebuild, WordPress.',
    },
    {
      clientName: 'Northside Brewing Co.',
      status: 'Contacted',
      fitScore: 3,
      nextActionDate: daysFromToday(1),
      notes: 'Wants online ordering. Budget unclear.',
    },
    {
      clientName: 'Maple Street Physio',
      status: 'Quoted',
      fitScore: 5,
      nextActionDate: daysFromToday(6),
      notes: 'Booking integration + SEO cleanup.',
    },
    {
      clientName: 'Lakeview Realty',
      status: 'Won',
      fitScore: 4,
      nextActionDate: daysFromToday(20),
      notes: 'Kickoff scheduled.',
    },
  ];
}
