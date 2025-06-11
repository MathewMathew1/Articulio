import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SourceType } from '../../../types/sources';
import { MAIN_ROUTE_API } from '../../../constant/mainRoute';
import { ArticleDtoResult } from '../../../apiResponsesType/BlogArticles';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private readonly API_URL = 'api/articles/selective';
  private readonly url = MAIN_ROUTE_API +  this.API_URL

  constructor(private http: HttpClient) {}

  fetchArticles(
    query: string,
    sources: (string|SourceType)[],
    page: number
  ): Observable<Record<string, ArticleDtoResult>> {
    let params = new HttpParams().set('query', query).set("page", page);
    sources.forEach((source) => {
      params = params.append('sources', source);
    });

    return this.http.get<Record<string, ArticleDtoResult>>(this.url, {
      params,
    });
  }
}
