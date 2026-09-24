import { Component, OnInit, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DEAL_STATUSES, DealInput, FitScore } from '../models/deal';
import { DealService } from '../services/deal.service';
import { daysFromToday } from '../shared/dates';

@Component({
  selector: 'app-deal-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './deal-form.html',
  styleUrl: './deal-form.css',
})
export class DealForm implements OnInit {
  private readonly dealService = inject(DealService);
  private readonly router = inject(Router);

  /** Present on /deals/:id/edit, absent on /deals/new. */
  readonly id = input<string>();

  protected readonly statuses = DEAL_STATUSES;
  protected readonly fitScores: FitScore[] = [1, 2, 3, 4, 5];
  protected readonly notFound = signal(false);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    clientName: ['', [Validators.required, Validators.maxLength(100)]],
    status: [DEAL_STATUSES[0] as DealInput['status'], Validators.required],
    fitScore: [3 as FitScore, [Validators.required, Validators.min(1), Validators.max(5)]],
    nextActionDate: [
      daysFromToday(7),
      [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)],
    ],
    notes: ['', Validators.maxLength(2000)],
  });

  ngOnInit(): void {
    const id = this.id();
    if (!id) return;
    const deal = this.dealService.getById(id);
    if (!deal) {
      this.notFound.set(true);
      return;
    }
    const { clientName, status, fitScore, nextActionDate, notes } = deal;
    this.form.setValue({ clientName, status, fitScore, nextActionDate, notes });
  }

  protected showError(name: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[name];
    return control.invalid && (control.touched || control.dirty);
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.getRawValue();
    const input: DealInput = {
      ...value,
      clientName: value.clientName.trim(),
      fitScore: Number(value.fitScore) as FitScore,
      notes: value.notes.trim(),
    };
    const id = this.id();
    if (id) {
      this.dealService.update(id, input);
      this.router.navigate(['/deals', id]);
    } else {
      const deal = this.dealService.add(input);
      this.router.navigate(['/deals', deal.id]);
    }
  }
}
