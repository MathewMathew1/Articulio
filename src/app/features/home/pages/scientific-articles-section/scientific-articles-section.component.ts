import { Component } from '@angular/core';
import { ScientificArticlesComponent } from '../../../articles/pages/scientific-articles.component/scientific-articles.component.component';
import { Meta, Title } from '@angular/platform-browser';
import { PopularScientificTabsComponent } from '../../../wrappers/populat-scientific/popular-scientific-tabs.component';

@Component({
  selector: 'app-articles-section',
  imports: [ScientificArticlesComponent, PopularScientificTabsComponent],
  templateUrl: './scientific-articles-section.component.html',
  styleUrl: './scientific-articles-section.component.css',
})
export class ScientificArticlesSectionComponent {
  constructor(private meta: Meta, private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Explore Scientific Papers');
    this.meta.updateTag({
      name: 'description',
      content:
        'Search and explore articles from PubMed, ArXiv, Crossref, and more on Articulio.',
    });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'scientific articles, PubMed, ArXiv, research, academic, open access',
    });
  }
}
