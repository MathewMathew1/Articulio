import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { MAIN_ROUTE_API } from '../../../../constant/mainRoute';
import { CreateFavoriteScientificArticle, FavoriteScientificArticle } from '../../../../apiResponsesType/UserData';
import { AuthStoreService } from '../authStoreService';

@Injectable({
  providedIn: 'root',
})
export class FavoriteScientificArticlesService {
  private readonly apiUrl = 'api/scientific-favorites';

  constructor(
    private http: HttpClient,
    private authStore: AuthStoreService
  ) {}

  addFavorite(article: CreateFavoriteScientificArticle): Observable<FavoriteScientificArticle> {
    return this.http
      .post<FavoriteScientificArticle>(`${MAIN_ROUTE_API}${this.apiUrl}`, article, { withCredentials: true })
      .pipe(tap((added) => this.authStore.addFavoriteScientificArticle(added)));
  }

  deleteFavorite(articleId: string): Observable<void> {
    return this.http
      .delete<void>(`${MAIN_ROUTE_API}${this.apiUrl}/${articleId}`, { withCredentials: true })
      .pipe(tap(() => this.authStore.removeFavoriteScientificArticle(articleId)));
  }

  updateFavorite(articleId: string, article: CreateFavoriteScientificArticle): Observable<FavoriteScientificArticle> {
    return this.http
      .put<FavoriteScientificArticle>(`${MAIN_ROUTE_API}${this.apiUrl}/${articleId}`, article, { withCredentials: true })
      .pipe(tap((updated) => this.authStore.replaceFavoriteScientificArticle(updated)));
  }
}
