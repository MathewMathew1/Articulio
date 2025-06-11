import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  FavoriteArticle,
  ToReadArticle,
  FavoriteScientificArticle,
  ToReadScientificArticle,
  UserProfile,
} from '../../../apiResponsesType/UserData';
import { ArrayStateManager } from './helpers/arrayStateManagment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthStoreService {
  private readonly userSubject = new BehaviorSubject<UserProfile | null>(null);
  readonly user$ = this.userSubject.asObservable();

  private favoriteManager?: ArrayStateManager<FavoriteArticle>;
  private toReadManager?: ArrayStateManager<ToReadArticle>;
  private favoriteScientificManager?: ArrayStateManager<FavoriteScientificArticle>;
  private toReadScientificManager?: ArrayStateManager<ToReadScientificArticle>;

  readonly isAuthenticated$ = this.user$.pipe(map((user) => user !== null));
  private readonly authenticationFinishedSubject = new BehaviorSubject<boolean>(
    false
  );
  readonly isAuthenticationFinished$ =
    this.authenticationFinishedSubject.asObservable();

  setUser(user: UserProfile) {
    this.userSubject.next(user);

    this.favoriteManager = new ArrayStateManager<FavoriteArticle>(
      (favorites) => this.updateFavorites(favorites),
      user.favoriteArticles || []
    );

    this.toReadManager = new ArrayStateManager<ToReadArticle>(
      (toReads) => this.updateToReads(toReads),
      user.toReadArticles || []
    );

    this.favoriteScientificManager =
      new ArrayStateManager<FavoriteScientificArticle>(
        (favorites) => this.updateFavoriteScientific(favorites),
        user.favoriteScientificArticles || []
      );

    this.toReadScientificManager =
      new ArrayStateManager<ToReadScientificArticle>(
        (toReads) => this.updateToReadScientific(toReads),
        user.toReadScientificArticles || []
      );
    this.setAuthenticationFinished(true);
  }

  setAuthenticationFinished(finished: boolean) {
    this.authenticationFinishedSubject.next(finished);
  }

  private updateFavorites(favorites: FavoriteArticle[]) {
    const current = this.currentUser;
    if (!current) return;
    this.userSubject.next({ ...current, favoriteArticles: favorites });
  }

  private updateToReads(toReadArticles: ToReadArticle[]) {
    const current = this.currentUser;
    if (!current) return;
    this.userSubject.next({ ...current, toReadArticles });
  }

  private updateFavoriteScientific(favorites: FavoriteScientificArticle[]) {
    const current = this.currentUser;
    if (!current) return;
    this.userSubject.next({
      ...current,
      favoriteScientificArticles: favorites,
    });
  }

  private updateToReadScientific(toReadArticles: ToReadScientificArticle[]) {
    const current = this.currentUser;
    if (!current) return;
    this.userSubject.next({
      ...current,
      toReadScientificArticles: toReadArticles,
    });
  }

  get currentUser(): UserProfile | null {
    return this.userSubject.value;
  }

  addFavoriteArticle(article: FavoriteArticle) {
    this.favoriteManager?.add(article);
  }

  removeFavoriteArticle(id: string) {
    this.favoriteManager?.remove(id);
  }

  addToReadArticle(article: ToReadArticle) {
    this.toReadManager?.add(article);
  }

  removeToReadArticle(id: string) {
    this.toReadManager?.remove(id);
  }

  replaceFavoriteArticle(article: FavoriteArticle) {
    this.favoriteManager?.replaceBy('url', article.url, article);
  }

  replaceToReadArticle(article: ToReadArticle) {
    this.toReadManager?.replaceBy('url', article.url, article);
  }

  addFavoriteScientificArticle(article: FavoriteScientificArticle) {
    this.favoriteScientificManager?.add(article);
  }

  removeFavoriteScientificArticle(id: string) {
    this.favoriteScientificManager?.remove(id);
  }

  replaceFavoriteScientificArticle(article: FavoriteScientificArticle) {
    this.favoriteScientificManager?.replaceBy('url', article.url, article);
  }

  addToReadScientificArticle(article: ToReadScientificArticle) {
    this.toReadScientificManager?.add(article);
  }

  removeToReadScientificArticle(id: string) {
    this.toReadScientificManager?.remove(id);
  }

  replaceToReadScientificArticle(article: ToReadScientificArticle) {
    this.toReadScientificManager?.replaceBy('url', article.url, article);
  }
}
