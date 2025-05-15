import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Credentials, LoggedInUser, LoginResponse } from '../interfaces/auth';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

const API_AUTH_BASE_URL = 'http://localhost:3000/api/v1/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private _token = signal<string | null>(localStorage.getItem('access_token'));

  user = computed(() => {
    const token = this._token();
    if (token) {
      return jwtDecode<LoggedInUser>(token);
    }
    return null;
  });

  tokenExpired = computed(() => {
    const token = this._token();
    if (token) {
      return this.isTokenExpired(token);
    }
    return true;
  });

  token = this._token.asReadonly();

  loginUser(credentials: Credentials) {
    return this.http
      .post<LoginResponse>(`${API_AUTH_BASE_URL}/login`, credentials)
      .pipe(
        tap((resp) => {
          this._token.set(resp.data);
          localStorage.setItem('access_token', resp.data);
        })
      );
  }

  logout() {
    this.clearCredentials();
    this.router.navigate(['/'], {
      replaceUrl: true,
    });
  }

  isTokenExpired(token: string) {
    const decoded = jwtDecode<{ exp: number }>(token);
    return decoded.exp * 1000 < Date.now();
  }

  clearCredentials() {
    localStorage.removeItem('access_token');
    this._token.set(null);
  }
}
