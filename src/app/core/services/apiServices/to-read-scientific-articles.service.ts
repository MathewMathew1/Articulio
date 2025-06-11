import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { MAIN_ROUTE_API } from '../../../../constant/mainRoute';
import {
  CreateReadScientificArticle,
  ToReadScientificArticle
} from '../../../../apiResponsesType/UserData';
import { AuthStoreService } from '../authStoreService';

@Injectable({
  providedIn: 'root',
})
export class ToReadScientificArticlesService {
  private readonly apiUrl = 'api/scientific-toreads';

  constructor(
    private http: HttpClient,
    private authStore: AuthStoreService
  ) {}

  addToRead(article: CreateReadScientificArticle): Observable<ToReadScientificArticle> {
    return this.http
      .post<ToReadScientificArticle>(`${MAIN_ROUTE_API}${this.apiUrl}`, article, { withCredentials: true })
      .pipe(tap((added) => this.authStore.addToReadScientificArticle(added)));
  }

  deleteToRead(articleId: string): Observable<void> {
    return this.http
      .delete<void>(`${MAIN_ROUTE_API}${this.apiUrl}/${articleId}`, { withCredentials: true })
      .pipe(tap(() => this.authStore.removeToReadScientificArticle(articleId)));
  }

  updateToRead(articleId: string, article: CreateReadScientificArticle): Observable<ToReadScientificArticle> {
    return this.http
      .put<ToReadScientificArticle>(`${MAIN_ROUTE_API}${this.apiUrl}/${articleId}`, article, { withCredentials: true })
      .pipe(tap((updated) => this.authStore.replaceToReadScientificArticle(updated)));
  }
}
