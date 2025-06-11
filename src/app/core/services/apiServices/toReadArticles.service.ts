import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { MAIN_ROUTE_API } from '../../../../constant/mainRoute';
import { CreateReadArticle, ToReadArticle } from '../../../../apiResponsesType/UserData';
import { AuthStoreService } from '../authStoreService';

@Injectable({
  providedIn: 'root',
})
export class ToReadArticlesService {
  private readonly apiUrl = 'api/toreads';

  constructor(
    private http: HttpClient,
    private authStore: AuthStoreService
  ) {}

  addToRead(article: CreateReadArticle): Observable<ToReadArticle> {
    return this.http
      .post<ToReadArticle>(`${MAIN_ROUTE_API}${this.apiUrl}`, article, {withCredentials: true})
      .pipe(tap((added) => this.authStore.addToReadArticle(added)));
  }

  deleteToRead(articleId: string): Observable<void> {
    return this.http
      .delete<void>(`${MAIN_ROUTE_API}${this.apiUrl}/${articleId}`, {withCredentials: true})
      .pipe(tap(() => this.authStore.removeToReadArticle(articleId)));
  }

  updateToRead(articleId: string, article: CreateReadArticle): Observable<ToReadArticle> {
    return this.http
      .put<ToReadArticle>(`${MAIN_ROUTE_API}${this.apiUrl}`, article, {withCredentials: true})
      .pipe(tap((updated) => {
        this.authStore.replaceToReadArticle(updated);
      }));
  }
}
