import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { combineLatest } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { AuthStoreService } from './authStoreService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-guard-wrapper',
  imports: [CommonModule, RouterModule],
  template: `
    <ng-container *ngIf="showContent">
      <router-outlet></router-outlet>
    </ng-container>
  `
})
export class AuthGuardWrapperComponent {
  showContent = false;

  constructor(private authStore: AuthStoreService, private router: Router) {
    combineLatest([
      this.authStore.isAuthenticationFinished$,
      this.authStore.user$
    ])
      .pipe(
        filter(([finished]) => finished),
        take(1)
      )
      .subscribe(([_, user]) => {
        if (user) {
          this.showContent = true;
        } else {
          this.router.navigate(['/login']);
        }
      });
  }
}

