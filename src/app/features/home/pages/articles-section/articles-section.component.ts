import { Component } from '@angular/core';
import { ArticleSearchComponent } from '../../../articles/pages/article-search/article-search.component';

import { HttpClient } from '@angular/common/http';
import { MostPopularArticlesComponent } from '../../../mostPopular/most-popular-articles/most-popular-articles.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-articles-section',
  imports: [ArticleSearchComponent, MostPopularArticlesComponent],
  templateUrl: './articles-section.component.html',
  styleUrl: './articles-section.component.css',
})
export class ArticlesSectionComponent {
  constructor(private meta: Meta, private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Explore Articles, Blogs');
    this.meta.updateTag({
      name: 'description',
      content:
        'Search and explore articles from Medium, News, Devto.',
    });
    this.meta.updateTag({
      name: 'keywords',
      content:
        'articles, info, news, blog',
    });
  }
}
