import { Component, Input } from '@angular/core';
import { ToReadScientificArticle } from '../../../../../apiResponsesType/UserData';
import { CommonModule } from '@angular/common';
import { ToReadScientificArticleComponent } from "../to-read-scientific-article/to-read-scientific-article.component";

@Component({
  selector: 'app-to-read-scientific-articles-section',
  imports: [CommonModule, ToReadScientificArticleComponent],
  templateUrl: './toRead-scientific-articles-section.component.html',
  styleUrls: ['./toRead-scientific-articles-section.component.css']
})
export class ToReadScientificArticlesSectionComponent {
  @Input() articles: ToReadScientificArticle[] = [];
  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }
}

