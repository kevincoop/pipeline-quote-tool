import { DealInput } from '../models/deal';
import { daysFromToday } from '../shared/dates';

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
