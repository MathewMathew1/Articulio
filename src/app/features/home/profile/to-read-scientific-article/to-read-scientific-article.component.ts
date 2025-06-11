import { Component, Input } from '@angular/core';
import { ToReadScientificArticle } from '../../../../../apiResponsesType/UserData';
import { CommonModule } from '@angular/common';
import { ToReadModalComponent } from '../../../../components/modals/to-read-modal.component';
import { ToReadScientificArticlesService } from '../../../../core/services/apiServices/to-read-scientific-articles.service';
import { ToReadScientificModalComponent } from '../../../../components/modals/scientific-to-read-modal/scientific-to-read-modal.component';
import { TrackerService } from '../../../../core/services/articleTracker.service';

@Component({
  selector: 'app-to-read-scientific-article',
  standalone: true,
  templateUrl: 'to-read-scientific-article.component.html',
  styles: [],
  imports: [CommonModule, ToReadScientificModalComponent],
})
export class ToReadScientificArticleComponent {
  @Input() article!: ToReadScientificArticle;
  isFavoriteModalOpen = false;

  constructor(
    private toReadService: ToReadScientificArticlesService,
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
    doi,
    download,
  }: {
    title: string;
    description: string;
    doi?: string;
    download?: string;
  }): void {
    this.toReadService
      .updateToRead(this.article.id, {
        title,
        description,
        doi,
        download,
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
