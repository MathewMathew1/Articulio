export interface ScientificArticle {
  title: string;
  abstract?: string;
  authors: string[];
  doi?: string;
  url?: string;
  journal?: string;
  year?: number;
  fullText?: string;
  downloadUrl?: string;
  source: string;
}

export interface ArticleFetchResult {
  articles: ScientificArticle[];
  hasMore: boolean;
  nextPageOffset?: number;
}
