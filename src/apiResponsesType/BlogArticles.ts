export interface ArticleMetadata {
  title: string;
  url: string;
  source: string;
  author: string;
  abstract: string;
}

export interface ArticleDtoResult {
  articles: ArticleMetadata[];
  hasMore: boolean;
  nextPageOffset?: number;
}


export enum ScraperSource {
  Medium = 'Medium',
  DevTo = 'DevTo',
  News = 'News',
}