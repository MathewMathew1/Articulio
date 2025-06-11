import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAIN_ROUTE_API } from '../../../../constant/mainRoute';
import { StringStorage } from '../../../helpers/stringStorage';
import {firstValueFrom } from 'rxjs';
import { TrackerService } from '../../../core/services/articleTracker.service';

interface MostPopularArticlesDto {
  articleUrl: string;
  description?: string;
  title?: string;
}


@Component({
  selector: 'app-most-popular-doi-articles',
  templateUrl: './most-popular-scientific-articles-doi.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class MostPopularDoi implements OnInit {
  @Input() visible = false;
  articles: MostPopularArticlesDto[] = [];
  currentPage: number = 1;
  loadedAll: boolean = false;
  loadLocks = new StringStorage();

  constructor(private http: HttpClient, private trackerService: TrackerService) {}

  ngOnInit(): void {}

  private loaded = false;

  onArticleClick(url: string): void {
    this.trackerService.trackScientificArticleDoi(url);
  }

  ngOnChanges(): void {
    if (this.visible && !this.loaded) {
      this.loadArticles();
      this.loaded = true;
    }
  }

  

  loadArticles(): void {
    this.loadLocks.runIfNotExists(
      `load`,
      async () => {
        try {
          const data = await firstValueFrom(
            this.http.get<MostPopularArticlesDto[]>(
              `${MAIN_ROUTE_API}api/tracker/mostPopular/scientific/doi?page=${this.currentPage}`
            )
          );

          if (data.length < 5) {
            this.loadedAll = true;
          }

          this.articles.push(...data);
          this.currentPage++;
        } catch (err) {
          console.error('Failed to load most popular DOIs', err);
        }
      }
    );
  }
}
