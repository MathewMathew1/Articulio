import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserPreferencesService {
  private readonly SOURCES_KEY = 'preferred_sources';
  private readonly SOURCES_SCIENTIFIC_KEY =
    'preferred_sources_scientific_articles';

  private isLocalStorageAvailable(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  getPreferredSources(): string[] | null {
    if (!this.isLocalStorageAvailable()) return null;
    const stored = localStorage.getItem(this.SOURCES_KEY);
    try {
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  setPreferredSources(sources: string[]): void {
    if (!this.isLocalStorageAvailable()) return;
    localStorage.setItem(this.SOURCES_KEY, JSON.stringify(sources));
  }

  getPreferredSourcesScientificArticles(): string[] | null {
    if (!this.isLocalStorageAvailable()) return null;
    const stored = localStorage.getItem(this.SOURCES_SCIENTIFIC_KEY);
    try {
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  setPreferredSourcesScientificArticles(sources: string[]): void {
    if (!this.isLocalStorageAvailable()) return;
    localStorage.setItem(this.SOURCES_SCIENTIFIC_KEY, JSON.stringify(sources));
  }
}
