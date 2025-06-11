import { Component, Input } from '@angular/core';
import { ToReadArticle } from '../../../../../apiResponsesType/UserData';
import { CommonModule } from '@angular/common';
import { ToReadArticleComponent } from "../to-read-article/to-read-article.component";

@Component({
  selector: 'app-to-read-articles-section',
  imports: [CommonModule, ToReadArticleComponent],
  templateUrl: './toRead-articles-section.component.html',
  styleUrls: ['./toRead-articles-section.component.css']
})
export class ToReadArticlesSectionComponent {
  @Input() articles: ToReadArticle[] = [];
  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }
}

