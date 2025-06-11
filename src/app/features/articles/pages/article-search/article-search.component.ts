import { Component, HostListener } from '@angular/core';
import { ArticleService } from '../../../../core/services/article.service';
import { ArticleDtoResult } from '../../../../../apiResponsesType/BlogArticles';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ArticleCardComponent } from '../../../../components/article-card/article-card.component';
import { SourceType } from '../../../../../types/sources';
import { UserPreferencesService } from '../../../../core/services/userPreferences.service';
import { UiButtonComponent } from '../../../../components/ui/Button/button.component';
import { UiInputComponent } from '../../../../components/ui/input/input.component';
import { StringStorage } from '../../../../helpers/stringStorage';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-article-search',
  templateUrl: './article-search.component.html',
  imports: [
    FormsModule,
    CommonModule,
    ArticleCardComponent,
    UiButtonComponent,
    UiInputComponent,
  ],
})
export class ArticleSearchComponent {
  query = '';
  selectedSources = new Set<string>();
  results: Record<string, ArticleDtoResult> = {};
  loading = false;
  error: string | null = null;
  loadLocks = new StringStorage();

  constructor(
    private articleService: ArticleService,
    private userPrefs: UserPreferencesService
  ) {
    const saved = this.userPrefs.getPreferredSources();
    const validSources = Object.values(SourceType).filter(
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
    this.userPrefs.setPreferredSources(Array.from(this.selectedSources));
  }

  getSources(): string[] {
    return Object.values(SourceType).filter(
      (value) => typeof value === 'string'
    );
  }

  dropdownOpen = false;

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  closeDropdownOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      this.dropdownOpen = false;
    }
  }

  getGroupedSources(): string[] {
    return Object.keys(this.results);
  }

  loadMore(source: string): void {
    this.loadLocks.runIfNotExists(`load:${source}`, async () => {
      const nextPage = this.results[source].nextPageOffset || 2;

      this.loading = true;
      this.error = '';

      try {
        const data = await firstValueFrom(
          this.articleService.fetchArticles(
            this.query,
            [source],
            nextPage
          )
        );

        const newResult = data[source];
        newResult.articles = [
          ...this.results[source].articles,
          ...newResult.articles,
        ];
        this.results[source] = newResult;
      } catch (err) {
        console.error(err);
        this.error = 'Failed to load more articles.';
      } finally {
        this.loading = false;
      }
    });
  }

  search(): void {
    this.loadLocks.runIfNotExists(`search`, async () => {
      if (!this.query.trim()) return;

      this.loading = true;
      this.error = null;
      this.results = {};

      try {
        const data = await firstValueFrom(
          this.articleService.fetchArticles(
            this.query,
            Array.from(this.selectedSources),
            1
          )
        );
   
        this.results = data;
      } catch (e) {
        console.log(e);
        this.error = 'Failed to fetch articles';
      } finally {
        this.loading = false;
      }
    });
  }
}
