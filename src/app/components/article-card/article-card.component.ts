import { Component, Input } from '@angular/core';
import { ArticleMetadata } from '../../../apiResponsesType/BlogArticles';
import { TrackerService } from '../../core/services/articleTracker.service';
import { FavoriteDropdownComponent } from '../article-dropdown/article-dropdown';
import { AuthStoreService } from '../../core/services/authStoreService';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FavoriteModalComponent } from '../favorite-article/favorite-modal.component';
import { ToReadModalComponent } from '../modals/to-read-modal.component';
import { FavoriteArticlesService } from '../../core/services/apiServices/favoriteArtcles-service';
import { ToReadArticlesService } from '../../core/services/apiServices/toReadArticles.service';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css'],
  imports: [
    FavoriteDropdownComponent,
    CommonModule,
    FavoriteModalComponent,
    ToReadModalComponent,
  ],
})
export class ArticleCardComponent {
  @Input() article!: ArticleMetadata;

  isAuthenticated$: Observable<boolean>;
  isFavoriteOpen = false;
  isReadOpen = false;

  constructor(
    private tracker: TrackerService,
    private authStore: AuthStoreService,
    private favoriteArticlesApi: FavoriteArticlesService,
    private readFavoriteArticleApi: ToReadArticlesService
  ) {
    this.isAuthenticated$ = this.authStore.isAuthenticated$;
  }

  onArticleClick(url: string, event: MouseEvent): void {
    this.tracker.trackArticleView(url);
  }

  saveFavorite({
    title,
    description,
    note,
  }: {
    title: string;
    description: string;
    note: string;
  }): void {

    this.favoriteArticlesApi.addFavorite({
      title,
      description,
      notes: note,
      url: this.article.url,
    }).subscribe();

    this.isFavoriteOpen = false;
  }

  saveToRead({
    title,
    description,
  }: {
    title: string;
    description: string;
  }): void {
    this.readFavoriteArticleApi.addToRead({
      title,
      description,
      url: this.article.url,
    }).subscribe()
    this.isReadOpen = false;
  }

  closeModal(): void {
    this.isFavoriteOpen = false;
    this.isReadOpen = false;
  }
}
