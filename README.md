# Pipeline & Quote

A small Angular app for tracking freelance prospects through a sales pipeline and
pricing work for them when it's time to quote.

## Why I built it

I run a freelance web practice and tracked prospects in a spreadsheet: status, how
good a fit each client is, when to follow up next, with conditional formatting to
flag anything overdue. Quotes lived in a separate rate calculator. This app puts
both in one place and mirrors that real workflow rather than a tutorial example.

## Features

- **Deals list:** add, edit, and delete prospects; filter by status
  (Lead → Contacted → Quoted → Won / Lost); sort by next action date or fit score.
- **Follow-up flags:** open deals past their next action date are marked
  *Overdue*; those due within 3 days are marked *Upcoming*. Closed deals are
  never flagged.
- **Quote calculator:** enter an hourly rate, hours, expenses, and margin and get
  a live breakdown. The rate is entered per quote because it varies by client and
  project; it defaults to the deal's last-used rate.
- **Quote history:** saved quotes snapshot their inputs and results, so past
  quotes stay accurate when rates change.
- **Persistence:** everything is stored in the browser's `localStorage`. There is
  no backend or account.

### Quote formula

```
total          = hours × rate × (1 + margin% / 100) + expenses
effective rate = total / hours
```

Margin applies to labor only; expenses are billed at cost.

## Tech stack and Angular patterns

- **Angular 22** with **standalone components** (no NgModules)
- **Signals** for state: `DealService` and `QuoteService` hold data in
  `signal()`s, expose read-only views, and derive filtered/sorted lists with
  `computed()`
- **Reactive Forms** with typed `FormBuilder` groups and validators for the deal
  form and quote calculator; `toSignal()` turns form changes into a live preview
- **Angular Router** with route params bound directly to component `input()`s
  (`withComponentInputBinding`)
- New control flow (`@if`, `@for`, `@let`) in templates
- Plain CSS with custom-property design tokens and automatic dark mode; no UI
  library

## Project structure

```
src/app/
  models/      Deal and Quote types
  services/    StorageService (localStorage), DealService, QuoteService
  deals/       List, detail, and form components; due-date flag logic
  quotes/      Quote calculator, quote history, pure pricing function
  shared/      Date helpers
```

## Running locally

Requires Node.js 22.22+, 24.15+, or 26+, and npm.

```bash
npm install
npm start
```

Then open http://localhost:4200. Use **Load sample deals** on the empty list to
explore with demo data.

## How it was built

Built with AI-assisted development (Claude Code). I defined the scope, data model,
and pricing rules from my own workflow, reviewed the generated code, and tested
each feature by hand.

## License

[MIT](LICENSE)
