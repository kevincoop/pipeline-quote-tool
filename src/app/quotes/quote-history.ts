import { Component, computed, inject, input } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { QuoteService } from '../services/quote.service';

@Component({
  selector: 'app-quote-history',
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './quote-history.html',
})
export class QuoteHistory {
  private readonly quoteService = inject(QuoteService);

  readonly dealId = input.required<string>();

  protected readonly quotes = computed(() => this.quoteService.forDeal(this.dealId()));

  protected delete(id: string): void {
    if (confirm('Delete this quote?')) this.quoteService.remove(id);
  }
}
