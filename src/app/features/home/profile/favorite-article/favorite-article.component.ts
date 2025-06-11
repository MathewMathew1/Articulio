// favorite-article.component.ts
import { Component, Input } from '@angular/core';
import { FavoriteArticle } from '../../../../../apiResponsesType/UserData';
import { CommonModule } from '@angular/common';
import { FavoriteArticlesService } from '../../../../core/services/apiServices/favoriteArtcles-service';
import { FavoriteModalComponent } from '../../../../components/favorite-article/favorite-modal.component';
import { TrackerService } from '../../../../core/services/articleTracker.service';

@Component({
  selector: 'app-favorite-article',
  standalone: true,
  templateUrl: 'favorite-article.component.html',
  styles: [],
  imports: [CommonModule, FavoriteModalComponent],
})
export class FavoriteArticleComponent {
  @Input() article!: FavoriteArticle;
  isFavoriteModalOpen = false;

  constructor(
    private favoriteArticlesService: FavoriteArticlesService,
    private trackerService: TrackerService
  ) {}

  onArticleClick(url: string): void {
    this.trackerService.trackArticleView(url);
  }

  onFavoriteClick(event: MouseEvent): void {
    event.stopPropagation();
    {
      this.favoriteArticlesService.deleteFavorite(this.article.id).subscribe({
        next: () => {
          console.log('Delete request successful');
        },
        error: (err) => {
          console.error('Delete request failed', err);
        },
      });
      return;
    }
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
    this.favoriteArticlesService
      .updateFavorite(this.article.id, {
        title,
        description,
        notes: note,
        url: this.article.url,
      })
      .subscribe();

    this.isFavoriteModalOpen = false;
  }

  openFavoriteModal() {
    this.isFavoriteModalOpen = true;
  }

  closeModal(): void {
    this.isFavoriteModalOpen = false;
  }
}
