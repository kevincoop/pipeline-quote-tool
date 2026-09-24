import { Injectable } from '@angular/core';

/**
 * Thin JSON wrapper around localStorage. Reads fall back to a default and
 * writes fail quietly, so private browsing or a full quota never breaks the app.
 */
@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly prefix = 'pqt:';

  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(this.prefix + key);
      return raw === null ? fallback : (JSON.parse(raw) as T);
    } catch {
      return fallback;
    }
  }

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(value));
    } catch {
      // Storage unavailable or full; keep the in-memory state.
    }
  }
}
