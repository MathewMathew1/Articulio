import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScientificArticle } from '../../../../../types/scientificArticles';
import { FullTextModalComponent } from '../reading-scientific/readingscientific.component';
import { TrackerService } from '../../../../core/services/articleTracker.service';
import { FavoriteDropdownComponent } from "../../../../components/scientific-article-dropdown/scientific-article-dropdown.component";
import { FavoriteModalComponent } from "../../../../components/modals/scientific-favorite-modal/scientific-favorite-modal.component";
import { ToReadScientificModalComponent } from "../../../../components/modals/scientific-to-read-modal/scientific-to-read-modal.component";
import { FavoriteScientificArticlesService } from '../../../../core/services/apiServices/favorite-scientific-articles-service';
import { ToReadScientificArticlesService } from '../../../../core/services/apiServices/to-read-scientific-articles.service';

@Component({
  selector: 'scientific-article',
  standalone: true,
  imports: [
    CommonModule,
    FullTextModalComponent,
    FavoriteDropdownComponent,
    FavoriteModalComponent,
    ToReadScientificModalComponent
],
  templateUrl: './scientific-article.component.html',
})
export class ScientificArticleComponent {
  @Input() article!: ScientificArticle;

  modalVisible = false;
  isFavoriteOpen = false;
  isReadOpen = false;

  constructor(
    private tracker: TrackerService,
    private favoriteArticlesApi: FavoriteScientificArticlesService,
    private toReadArticlesApi: ToReadScientificArticlesService
  ) {}

  onArticleDownload(url: string, event: MouseEvent): void {
    this.tracker.trackScientificArticleDownload(url);
  }

  onArticleDoi(url: string, event: MouseEvent): void {
    this.tracker.trackScientificArticleDoi(url);
  }

  readFull(): void {
    this.modalVisible = true;
  }

  openFavoriteModal(): void {
    this.isFavoriteOpen = true;
  }

  openToReadModal(): void {
    this.isReadOpen = true;
  }

  saveFavorite(data: {
    title: string;
    description: string;
    note: string;
    doi?: string;
    downloadUrl?: string;
  }): void {
    if(!this.article.url && !data.doi && !data.downloadUrl) return

    this.favoriteArticlesApi.addFavorite({
      title: data.title,
      description: data.description,
      notes: data.note,
      doi: data.doi,
      download: data.downloadUrl,
      url: (this.article.url || data.doi || data.downloadUrl)!,
    }).subscribe();

    this.isFavoriteOpen = false;
  }

  saveToRead(data: { title: string; description: string; doi?: string; downloadUrl?: string }): void {
    if(!this.article.url && !data.doi && !data.downloadUrl) return

    this.toReadArticlesApi.addToRead({
      title: data.title,
      description: data.description,
      doi: data.doi,
      download: data.downloadUrl,
      url: (this.article.url || data.doi || data.downloadUrl)!,
    }).subscribe();

    this.isReadOpen = false;
  }

  closeModal(): void {
    this.isFavoriteOpen = false;
    this.isReadOpen = false;
  }
}
