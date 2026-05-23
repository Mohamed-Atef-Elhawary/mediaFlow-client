import { Injectable, signal, WritableSignal } from '@angular/core';
import { AuthView } from '../types/authType';
import { UserRegister } from '../interfaces/user-register';
import { UserLogin } from '../interfaces/user-login';
import { ApiResponse } from '../interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginResponse } from '../interfaces/login-response';
import { ApiUserInfo } from '../interfaces/api-user-info';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userInfo = signal<ApiUserInfo | null>(null);
  userData: WritableSignal<LoginResponse | null> = signal(null);
  authView = signal<AuthView>('outer');
  showUserMenu = signal<boolean>(false);
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.loadUserSession();
  }

  loadUserSession() {
    const jsonUserData = localStorage.getItem('userData');
    const jsonUserInfo = localStorage.getItem('userInfo');
    if (jsonUserData) {
      this.userData.set(JSON.parse(jsonUserData));
      if (this.userData()?.token) {
        this.authView.set('authorized');
      }
    }
    if (jsonUserInfo) {
      this.userInfo.set(JSON.parse(jsonUserInfo));
    }
  }

  updateAuthState(data: LoginResponse) {
    if (data) {
      const jsonUserData = JSON.stringify(data);
      localStorage.setItem('userData', jsonUserData);
      this.userData.set(data);
    }
  }

  userDataSeter(data: ApiUserInfo): void {
    this.userData.update((value) => {
      if (value) {
        const newValue = { ...value };
        if (data.image) {
          newValue.image = data.image;
        }
        newValue.name = data.name;
        return newValue;
      }
      return value;
    });

    this.userInfo.set(data);
    localStorage.setItem('userData', JSON.stringify(this.userData()));
    localStorage.setItem('userInfo', JSON.stringify(data));
  }

  signOut() {
    localStorage.removeItem('userData');
    this.userData.set(null);
    localStorage.removeItem('userInfo');
    this.userInfo.set(null);
    this.authView.set('outer');
    this.router.navigate(['/outer']);
  }

  register(data: UserRegister): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${environment.backendUrl}user/register`, data);
  }
  login(data: UserLogin): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${environment.backendUrl}user/login`, data);
  }
}
