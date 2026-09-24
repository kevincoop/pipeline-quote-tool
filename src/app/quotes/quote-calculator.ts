import { Component, OnInit, inject, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { map } from 'rxjs';
import { QuoteInput } from '../models/quote';
import { QuoteService } from '../services/quote.service';
import { QuoteBreakdown, calculateQuote } from './quote-math';

@Component({
  selector: 'app-quote-calculator',
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './quote-calculator.html',
  styleUrl: './quote-calculator.css',
})
export class QuoteCalculator implements OnInit {
  private readonly quoteService = inject(QuoteService);

  readonly dealId = input.required<string>();

  private readonly fb = inject(FormBuilder);
  protected readonly form = this.fb.group({
    hourlyRate: this.fb.control<number | null>(null, [Validators.required, Validators.min(0.01)]),
    hours: this.fb.control<number | null>(null, [Validators.required, Validators.min(0.25)]),
    expenses: this.fb.control<number | null>(0, [Validators.required, Validators.min(0)]),
    marginPercent: this.fb.control<number | null>(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(1000),
    ]),
  });

  /** Live breakdown while typing; null until every field is valid. */
  protected readonly preview = toSignal(this.form.valueChanges.pipe(map(() => this.breakdown())), {
    initialValue: null,
  });

  ngOnInit(): void {
    // Rates vary by client and project, so start from this deal's last-used rate.
    const lastRate = this.quoteService.forDeal(this.dealId())[0]?.hourlyRate;
    if (lastRate !== undefined) this.form.patchValue({ hourlyRate: lastRate });
  }

  protected showError(name: keyof typeof this.form.controls): boolean {
    const control = this.form.controls[name];
    return control.invalid && (control.touched || control.dirty);
  }

  protected save(): void {
    const input = this.validInput();
    if (!input) {
      this.form.markAllAsTouched();
      return;
    }
    this.quoteService.add(this.dealId(), input);
  }

  private breakdown(): QuoteBreakdown | null {
    const input = this.validInput();
    return input ? calculateQuote(input) : null;
  }

  private validInput(): QuoteInput | null {
    if (this.form.invalid) return null;
    const { hourlyRate, hours, expenses, marginPercent } = this.form.getRawValue();
    return {
      hourlyRate: Number(hourlyRate),
      hours: Number(hours),
      expenses: Number(expenses),
      marginPercent: Number(marginPercent),
    };
  }
}
