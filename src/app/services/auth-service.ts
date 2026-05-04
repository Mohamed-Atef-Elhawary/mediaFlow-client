import { effect, Injectable, Signal, signal, WritableSignal } from '@angular/core';
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
  showUserMenu = signal<boolean>(false);
  userData: WritableSignal<LoginResponse | null> = signal(this.getUserData());

  authView = signal<AuthView>(this.userData()?.token ? 'authorized' : 'outer');

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    let jsonObj = localStorage.getItem('userInfo');
    if (jsonObj) {
      this.userInfo.set(JSON.parse(jsonObj));
    }
  }

  getUserData(): LoginResponse | null {
    let jsonUserData = localStorage.getItem('userData');
    if (jsonUserData) {
      return JSON.parse(jsonUserData);
    }
    return null;
  }
  updateAuthState(data: LoginResponse) {
    if (data) {
      let jsonUserData = JSON.stringify(data);
      localStorage.setItem('userData', jsonUserData);
      this.userData.set(data);
      this.authView.set('authorized');
      this.router.navigate(['/home']);
    } else {
      this.signOut();
    }
  }

  userDataSeter(data: ApiUserInfo): void {
    let newUserData: LoginResponse = this.userData() || ({} as LoginResponse);
    const { image, name } = data;
    if (image) {
      newUserData.image = image;
    }
    newUserData.name = name;
    this.userData.update((v) => ({ ...v, ...newUserData }));
    localStorage.setItem('userData', JSON.stringify(this.userData()));

    this.userInfo.set(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
  }
  // userDataRemover() {
  //   localStorage.removeItem('userInfo');
  //   this.userInfo.set(null);
  // }
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
