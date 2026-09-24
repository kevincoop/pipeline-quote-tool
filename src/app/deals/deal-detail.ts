import { Component, computed, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DealService } from '../services/deal.service';
import { QuoteCalculator } from '../quotes/quote-calculator';
import { QuoteHistory } from '../quotes/quote-history';

@Component({
  selector: 'app-deal-detail',
  imports: [RouterLink, DatePipe, QuoteCalculator, QuoteHistory],
  templateUrl: './deal-detail.html',
})
export class DealDetail {
  private readonly dealService = inject(DealService);
  private readonly router = inject(Router);

  /** Bound from the :id route param via withComponentInputBinding(). */
  readonly id = input.required<string>();

  protected readonly deal = computed(() =>
    this.dealService.deals().find((d) => d.id === this.id()),
  );

  protected delete(): void {
    const deal = this.deal();
    if (!deal || !confirm(`Delete ${deal.clientName} and its quotes? This cannot be undone.`))
      return;
    this.dealService.remove(deal.id);
    this.router.navigate(['/deals']);
  }
}
