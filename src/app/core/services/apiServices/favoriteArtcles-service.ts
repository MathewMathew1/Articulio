import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { MAIN_ROUTE_API } from '../../../../constant/mainRoute';
import { CreateFavoriteArticle } from '../../../../apiResponsesType/UserData';
import { AuthStoreService } from '../authStoreService';


export interface FavoriteArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  userId: string;
  notes?: string;
}

@Injectable({
  providedIn: 'root',
})
export class FavoriteArticlesService {
  private readonly apiUrl = 'api/favorites';

  constructor(
    private http: HttpClient,
    private authStore: AuthStoreService
  ) {}

  addFavorite(article: CreateFavoriteArticle): Observable<FavoriteArticle> {
    console.log(`${MAIN_ROUTE_API}${this.apiUrl}`)
    return this.http
      .post<FavoriteArticle>(`${MAIN_ROUTE_API}${this.apiUrl}`, article, {withCredentials: true})
      .pipe(tap((added) => {console.log(added); this.authStore.addFavoriteArticle(added)}));
  }

  deleteFavorite(articleId: string): Observable<void> {
    console.log(`${MAIN_ROUTE_API}${this.apiUrl}/${articleId}`)
    return this.http
      .delete<void>(`${MAIN_ROUTE_API}${this.apiUrl}/${articleId}`,  {withCredentials: true})
      .pipe(tap(() => {console.log("deleted");  this.authStore.removeFavoriteArticle(articleId)}));
  }

  updateFavorite(
    articleId: string,
    article: CreateFavoriteArticle
  ): Observable<FavoriteArticle> {
    
    return this.http
      .put<FavoriteArticle>(`${MAIN_ROUTE_API}${this.apiUrl}`, article, {withCredentials: true})
      .pipe(tap((updated) => {
        this.authStore.replaceFavoriteArticle(updated);
      }));
  }
}

