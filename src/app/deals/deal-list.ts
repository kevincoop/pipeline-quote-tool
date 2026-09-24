import { Component, computed, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DEAL_STATUSES, DealStatus } from '../models/deal';
import { DealService } from '../services/deal.service';
import { dueState } from './due-state';
import { sampleDeals } from './sample-deals';

type SortKey = 'nextAction' | 'fitScore';

@Component({
  selector: 'app-deal-list',
  imports: [RouterLink, DatePipe],
  templateUrl: './deal-list.html',
  styleUrl: './deal-list.css',
})
export class DealList {
  protected readonly dealService = inject(DealService);

  protected readonly statuses = DEAL_STATUSES;
  protected readonly statusFilter = signal<DealStatus | 'All'>('All');
  protected readonly sortKey = signal<SortKey>('nextAction');
  protected readonly dueState = dueState;

  protected readonly visibleDeals = computed(() => {
    const filter = this.statusFilter();
    const deals = this.dealService.deals().filter((d) => filter === 'All' || d.status === filter);
    return this.sortKey() === 'fitScore'
      ? deals.sort(
          (a, b) => b.fitScore - a.fitScore || a.nextActionDate.localeCompare(b.nextActionDate),
        )
      : deals.sort((a, b) => a.nextActionDate.localeCompare(b.nextActionDate));
  });

  protected setFilter(value: string): void {
    this.statusFilter.set(value as DealStatus | 'All');
  }

  protected setSort(value: string): void {
    this.sortKey.set(value as SortKey);
  }

  protected loadSamples(): void {
    sampleDeals().forEach((d) => this.dealService.add(d));
  }
}
