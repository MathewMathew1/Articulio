import { Component, Input } from '@angular/core';
import { FavoriteScientificArticle } from '../../../../../apiResponsesType/UserData';
import { CommonModule } from '@angular/common';
import { ScientificFavoriteArticleComponent } from "../favorite-scientific-article/favorite-scientific-article.component";

@Component({
  selector: 'app-favorite-scientific-articles-section',
  imports: [CommonModule,  ScientificFavoriteArticleComponent],
  templateUrl: './favorite-scientific-articles-section.component.html',
  styleUrl: './favorite-scientific-articles-section.component.css'
})
export class FavoriteScientificArticlesSectionComponent {
  @Input() articles: FavoriteScientificArticle[] = [];
  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }
}

