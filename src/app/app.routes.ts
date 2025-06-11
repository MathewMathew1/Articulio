import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScientificArticlesSectionComponent } from './features/home/pages/scientific-articles-section/scientific-articles-section.component';
import { ArticlesSectionComponent } from './features/home/pages/articles-section/articles-section.component';
import { LoginSignupComponent } from './features/login/login-signup.component';

import { ProfileComponent } from './features/home/profile/profile.component';
import { LoginRedirectWrapperComponent } from './core/services/authRedirectGuard.service';
import { AuthGuardWrapperComponent } from './core/services/authGuard.service';

export const routes: Routes = [
  { path: 'scientific', component: ScientificArticlesSectionComponent },
  { path: 'blogs', component: ArticlesSectionComponent },
  {
    path: 'login',
    component: LoginRedirectWrapperComponent,
    children: [{ path: '', component: LoginSignupComponent }],
  },
  {
    path: 'profile',
    component: AuthGuardWrapperComponent,
    children: [{ path: '', component: ProfileComponent }],
  },
  { path: '', redirectTo: '/scientific', pathMatch: 'full' },
  { path: '**', redirectTo: '/scientific' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
