import { Routes } from '@angular/router';
import { DealList } from './deals/deal-list';
import { DealDetail } from './deals/deal-detail';
import { DealForm } from './deals/deal-form';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'deals' },
  { path: 'deals', component: DealList, title: 'Deals' },
  { path: 'deals/new', component: DealForm, title: 'New deal' },
  { path: 'deals/:id', component: DealDetail, title: 'Deal' },
  { path: 'deals/:id/edit', component: DealForm, title: 'Edit deal' },
  { path: '**', redirectTo: 'deals' },
];
