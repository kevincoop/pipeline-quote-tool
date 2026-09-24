import { Component, computed, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DealService } from '../services/deal.service';

@Component({
  selector: 'app-deal-detail',
  imports: [RouterLink, DatePipe],
  templateUrl: './deal-detail.html',
})
export class DealDetail {
  private readonly dealService = inject(DealService);

  /** Bound from the :id route param via withComponentInputBinding(). */
  readonly id = input.required<string>();

  protected readonly deal = computed(() => this.dealService.getById(this.id()));
}
