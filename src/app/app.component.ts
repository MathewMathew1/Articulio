import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/userAuth.service';
import {
  AuthStoreService,
} from './core/services/authStoreService';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserProfile } from '../apiResponsesType/UserData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    RouterOutlet,
  ],
})
export class AppComponent {
  title = 'Articulio';
  isMenuOpen = false;
  dropdownOpen = false;
  user?: UserProfile;

  constructor(
    private auth: AuthService,
    private store: AuthStoreService,
    private router: Router
  ) {
    this.auth.getProfile().subscribe({
      next: (res) => {
        console.log(res)
        this.store.setUser(res);
        this.user = res;
      },
      error: (e) => {
        console.log(e)
        this.store.setAuthenticationFinished(true)
        this.user = undefined;
      },
    });
  }

  logout() {
    this.auth.logout().subscribe(() => {
      this.router.navigate(['']);
      window.location.reload();
    });
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
