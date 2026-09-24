import { Routes } from '@angular/router';
import { DealList } from './deals/deal-list';
import { DealDetail } from './deals/deal-detail';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'deals' },
  { path: 'deals', component: DealList, title: 'Deals' },
  { path: 'deals/:id', component: DealDetail, title: 'Deal' },
  { path: '**', redirectTo: 'deals' },
];
