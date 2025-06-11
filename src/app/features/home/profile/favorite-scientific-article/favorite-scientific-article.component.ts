import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteScientificArticle } from '../../../../../apiResponsesType/UserData';
import { FavoriteModalComponent } from '../../../../components/modals/scientific-favorite-modal/scientific-favorite-modal.component';
import { FavoriteScientificArticlesService } from '../../../../core/services/apiServices/favorite-scientific-articles-service';
import { TrackerService } from '../../../../core/services/articleTracker.service';

@Component({
  selector: 'app-scientific-favorite-article',
  standalone: true,
  templateUrl: './favorite-scientific-article.component.html',
  imports: [CommonModule, FavoriteModalComponent],
})
export class ScientificFavoriteArticleComponent {
  @Input() article!: FavoriteScientificArticle;
  isModalOpen = false;

  constructor(
    private favoriteArticlesService: FavoriteScientificArticlesService,
    private trackerService: TrackerService
  ) {}

  onArticleClickDownload(url: string): void {
    this.trackerService.trackScientificArticleDownload(url);
  }

  onArticleClickDoi(url: string): void {
    this.trackerService.trackScientificArticleDoi(url);
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

  saveFavorite(data: {
    title: string;
    description: string;
    note: string;
    doi?: string;
    downloadUrl?: string;
  }): void {
    this.favoriteArticlesService
      .updateFavorite(this.article.id, {
        ...data,
        notes: data.note,
        url: this.article.url,
      })
      .subscribe();

    this.isModalOpen = false;
  }

  onDeleteClick(event: MouseEvent): void {
    event.stopPropagation();
    this.favoriteArticlesService.deleteFavorite(this.article.id).subscribe({
      next: () => console.log('Scientific favorite deleted'),
      error: (err) => console.error('Failed to delete', err),
    });
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
