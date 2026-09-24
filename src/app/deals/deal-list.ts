import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DealService } from '../services/deal.service';
import { sampleDeals } from './sample-deals';

@Component({
  selector: 'app-deal-list',
  imports: [RouterLink, DatePipe],
  templateUrl: './deal-list.html',
})
export class DealList {
  protected readonly dealService = inject(DealService);

  protected loadSamples(): void {
    sampleDeals().forEach((d) => this.dealService.add(d));
  }
}
