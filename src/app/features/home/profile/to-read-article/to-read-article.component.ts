// favorite-article.component.ts
import { Component, Input } from '@angular/core';
import {
  FavoriteArticle,
  ToReadArticle,
} from '../../../../../apiResponsesType/UserData';
import { CommonModule } from '@angular/common';
import { ToReadModalComponent } from '../../../../components/modals/to-read-modal.component';
import { ToReadArticlesService } from '../../../../core/services/apiServices/toReadArticles.service';
import { TrackerService } from '../../../../core/services/articleTracker.service';

@Component({
  selector: 'app-to-read-article',
  standalone: true,
  templateUrl: 'to-read-article.component.html',
  styles: [],
  imports: [CommonModule, ToReadModalComponent],
})
export class ToReadArticleComponent {
  @Input() article!: ToReadArticle;
  isFavoriteModalOpen = false;

  constructor(
    private toReadService: ToReadArticlesService,
    private trackerService: TrackerService
  ) {}

  onArticleClick(url: string): void {
    this.trackerService.trackArticleView(url);
  }

  onFavoriteClick(event: MouseEvent): void {
    event.stopPropagation();
    {
      this.toReadService.deleteToRead(this.article.id).subscribe({
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
  }: {
    title: string;
    description: string;
  }): void {
    this.toReadService
      .updateToRead(this.article.id, {
        title,
        description,
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
