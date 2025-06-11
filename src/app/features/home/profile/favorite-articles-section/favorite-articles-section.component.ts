import { Component, Input } from '@angular/core';
import { FavoriteArticle } from '../../../../../apiResponsesType/UserData';
import { FavoriteArticleComponent } from "../favorite-article/favorite-article.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite-articles-section',
  imports: [FavoriteArticleComponent, CommonModule],
  templateUrl: './favorite-articles-section.component.html',
  styleUrl: './favorite-articles-section.component.css'
})
export class FavoriteArticlesSectionComponent {
  @Input() articles: FavoriteArticle[] = [];
  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }
}

