import { Injectable } from '@angular/core';
import { MAIN_ROUTE_API } from '../../../constant/mainRoute';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../../../apiResponsesType/UserData';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }) {
    return this.http.post(`${MAIN_ROUTE_API}api/auth/login`, data, {
      withCredentials: true,
    });
  }

  signup(data: { email: string; password: string }) {
    return this.http.post(`${MAIN_ROUTE_API}api/auth/signup`, data, {
      withCredentials: true,
    });
  }

  getProfile(): Observable<UserProfile> {
    return this.http.post<UserProfile>(`${MAIN_ROUTE_API}api/auth/profile`, {}, { withCredentials: true });
  }

logout() {
  return this.http.post(`${MAIN_ROUTE_API}api/auth/logout`, null, {
    withCredentials: true,
  });
}
  loginWithGoogle() {
    window.location.href = `${MAIN_ROUTE_API}api/auth/google`;
  }

  loginWithDiscord() {
    window.location.href = `${MAIN_ROUTE_API}api/auth/discord`;
  }
}
