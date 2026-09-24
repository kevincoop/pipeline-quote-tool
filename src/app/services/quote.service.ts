import { Injectable, inject, signal } from '@angular/core';
import { Quote, QuoteInput } from '../models/quote';
import { calculateQuote } from '../quotes/quote-math';
import { StorageService } from './storage.service';

const STORAGE_KEY = 'quotes';

@Injectable({ providedIn: 'root' })
export class QuoteService {
  private readonly storage = inject(StorageService);
  private readonly _quotes = signal<Quote[]>(this.storage.get<Quote[]>(STORAGE_KEY, []));

  readonly quotes = this._quotes.asReadonly();

  /** Newest first. */
  forDeal(dealId: string): Quote[] {
    return this._quotes()
      .filter((q) => q.dealId === dealId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  add(dealId: string, input: QuoteInput): Quote {
    const { total, effectiveRate } = calculateQuote(input);
    const quote: Quote = {
      ...input,
      id: crypto.randomUUID(),
      dealId,
      total,
      effectiveRate,
      createdAt: new Date().toISOString(),
    };
    this.commit([...this._quotes(), quote]);
    return quote;
  }

  remove(id: string): void {
    this.commit(this._quotes().filter((q) => q.id !== id));
  }

  removeForDeal(dealId: string): void {
    this.commit(this._quotes().filter((q) => q.dealId !== dealId));
  }

  private commit(quotes: Quote[]): void {
    this._quotes.set(quotes);
    this.storage.set(STORAGE_KEY, quotes);
  }
}
