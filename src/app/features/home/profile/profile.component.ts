import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info/user-info.component';
import { AuthStoreService } from '../../../core/services/authStoreService';
import { FavoriteArticle, FavoriteScientificArticle, ToReadArticle, ToReadScientificArticle, UserDto, UserProfile } from '../../../../apiResponsesType/UserData';
import { ToReadArticlesSectionComponent } from "./toRead-articles-section/toRead-articles-section.component";
import { FavoriteScientificArticlesSectionComponent } from "./favorite-scientific-articles-section/favorite-scientific-articles-section.component";
import { FavoriteArticlesSectionComponent } from "./favorite-articles-section/favorite-articles-section.component";
import { ToReadScientificArticlesSectionComponent } from "./toRead-scientific-articles-section/toRead-scientific-articles-section.component";
import { HistorySectionComponent } from "./favorite-article/history-section/history-section.component";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, UserInfoComponent, ToReadArticlesSectionComponent, FavoriteScientificArticlesSectionComponent, FavoriteArticlesSectionComponent, ToReadScientificArticlesSectionComponent, HistorySectionComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  userInfo!: UserDto;
  userFavoriteArticles: FavoriteArticle[] = []
  userToReadArticles: ToReadArticle[] = []
  userFavoriteScientificArticles: FavoriteScientificArticle[] = []
  userToReadScientificArticles: ToReadScientificArticle[] = []

  constructor(private authStore: AuthStoreService) {
    this.authStore.user$.subscribe((userProfile: UserProfile|null) => {
      if(userProfile == null) return

      this.userInfo = userProfile!.userMainInfo;
      this.userFavoriteArticles = userProfile!.favoriteArticles;
      this.userToReadArticles = userProfile!.toReadArticles;
      this.userFavoriteScientificArticles = userProfile!.favoriteScientificArticles;
      this.userToReadScientificArticles = userProfile!.toReadScientificArticles;
      console.log(userProfile)
    });
  }
}
