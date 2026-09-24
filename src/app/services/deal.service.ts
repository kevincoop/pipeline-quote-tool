import { Injectable, inject, signal } from '@angular/core';
import { Deal, DealInput } from '../models/deal';
import { QuoteService } from './quote.service';
import { StorageService } from './storage.service';

const STORAGE_KEY = 'deals';

@Injectable({ providedIn: 'root' })
export class DealService {
  private readonly storage = inject(StorageService);
  private readonly quoteService = inject(QuoteService);
  private readonly _deals = signal<Deal[]>(this.storage.get<Deal[]>(STORAGE_KEY, []));

  readonly deals = this._deals.asReadonly();

  getById(id: string): Deal | undefined {
    return this._deals().find((d) => d.id === id);
  }

  add(input: DealInput): Deal {
    const deal: Deal = { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
    this.commit([...this._deals(), deal]);
    return deal;
  }

  update(id: string, changes: Partial<DealInput>): void {
    this.commit(this._deals().map((d) => (d.id === id ? { ...d, ...changes } : d)));
  }

  /** Also deletes the deal's quote history. */
  remove(id: string): void {
    this.quoteService.removeForDeal(id);
    this.commit(this._deals().filter((d) => d.id !== id));
  }

  private commit(deals: Deal[]): void {
    this._deals.set(deals);
    this.storage.set(STORAGE_KEY, deals);
  }
}
