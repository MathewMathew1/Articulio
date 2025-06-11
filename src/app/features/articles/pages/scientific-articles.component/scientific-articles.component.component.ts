import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MAIN_ROUTE_API } from '../../../../../constant/mainRoute';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiButtonComponent } from '../../../../components/ui/Button/button.component';
import { UiInputComponent } from '../../../../components/ui/input/input.component';
import { ArticleFetchResult } from '../../../../../types/scientificArticles';
import { ScientificArticleComponent } from '../scientific-article/scientific-article.component';
import { SourceScientificArticle } from '../../../../../types/sources';
import { UserPreferencesService } from '../../../../core/services/userPreferences.service';
import { StringStorage } from '../../../../helpers/stringStorage';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-scientific-articles',
  templateUrl: './scientific-articles.component.component.html',
  imports: [
    FormsModule,
    CommonModule,
    UiButtonComponent,
    UiInputComponent,
    ScientificArticleComponent,
  ],
})
export class ScientificArticlesComponent {
  query = '';
  searchType: 'author' | 'tag' = 'tag';
  groupedArticles: Record<string, ArticleFetchResult> = {};
  loading = false;
  error = '';
  selectedSources = new Set<string>();
  dropdownOpen = false;
  loadLocks = new StringStorage();

  showSourceInfoModal = false;

  constructor(
    private userPrefs: UserPreferencesService,
    private http: HttpClient
  ) {
    const saved = this.userPrefs.getPreferredSourcesScientificArticles();
    const validSources = Object.values(ScientificArticleComponent).filter(
      (v) => typeof v === 'string'
    );

    const initial = saved !== null ? saved : validSources;
    this.selectedSources = new Set(initial);
  }

  toggleSource(source: string): void {
    if (this.selectedSources.has(source)) {
      this.selectedSources.delete(source);
    } else {
      this.selectedSources.add(source);
    }
    this.userPrefs.setPreferredSourcesScientificArticles(
      Array.from(this.selectedSources)
    );
  }

  openSourceInfoModal() {
    this.showSourceInfoModal = true;
  }

  closeSourceInfoModal() {
    this.showSourceInfoModal = false;
  }

  getSources(): string[] {
    return Object.values(SourceScientificArticle).filter(
      (value) => typeof value === 'string'
    );
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  getGroupedSources(): string[] {
    return Object.keys(this.groupedArticles);
  }

  loadMore(source: string): void {
    this.loadLocks.runIfNotExists(`load:${source}`, async () => {
      const nextPage = this.groupedArticles[source].nextPageOffset || 2;

      const basePath = this.searchType === 'author' ? 'author' : 'tag';
      const sourceParams = `sources=${encodeURIComponent(source)}`;
      const url = `${MAIN_ROUTE_API}api/scientific-papers/search/${basePath}/selective?query=${encodeURIComponent(
        this.query
      )}&${sourceParams}&page=${nextPage}`;

      this.loading = true;
      this.error = '';

      try {
        const data = await firstValueFrom(
          this.http.get<Record<string, ArticleFetchResult>>(url)
        );

        const newResult = data[source];
        newResult.articles = [
          ...this.groupedArticles[source].articles,
          ...newResult.articles,
        ];
        this.groupedArticles[source] = newResult;
      } catch (err) {
        console.error(err);
        this.error = 'Failed to load more articles.';
      } finally {
        this.loading = false;
      }
    });
  }

  fetchArticles(): void {
    this.loadLocks.runIfNotExists(`fetch`, async () => {
      this.loading = true;
      this.error = '';
      this.groupedArticles = {};

      if (this.selectedSources.size === 0) {
        this.error = 'Select at least one source.';
        this.loading = false;
        return;
      }

      const sourceParams = Array.from(this.selectedSources)
        .map((source) => `sources=${encodeURIComponent(source)}`)
        .join('&');

      const basePath = this.searchType === 'author' ? 'author' : 'tag';
      const url = `${MAIN_ROUTE_API}api/scientific-papers/search/${basePath}/selective?query=${encodeURIComponent(
        this.query
      )}&${sourceParams}`;

      try {
        const data = await firstValueFrom(
          this.http.get<Record<string, ArticleFetchResult>>(url)
        );
        this.groupedArticles = data;
      } catch (err) {
        console.error(err);
        this.error = 'Failed to fetch articles.';
      } finally {
        this.loading = false;
      }
    });
  }
}
