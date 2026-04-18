import { effect, Injectable, signal } from '@angular/core';
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

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    // effect(
    //   () => {
    //     const uToken = this.userToken();
    //     if (uToken) {
    //       localStorage.setItem('userToken', uToken);
    //       this.authView.set('authorized');
    //     } else {
    //       localStorage.removeItem('userToken');
    //       this.authView.set('outer');
    //     }
    //   },
    //   { allowSignalWrites: true },
    // );

    let jsonObj = localStorage.getItem('userInfo');
    if (jsonObj) {
      this.userInfo.set(JSON.parse(jsonObj));
    }
  }
  userToken = signal<string | null>(localStorage.getItem('userToken'));
  userImage = signal<string | null>(localStorage.getItem('userImage'));
  userName = signal<string | null>(localStorage.getItem('userName'));
  authView = signal<AuthView>(this.userToken() ? 'authorized' : 'outer');

  updateAuthState(data: LoginResponse) {
    if (data) {
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userImage', data.image);
      localStorage.setItem('userName', data.name);
      this.userToken.set(data.token);
      this.userImage.set(data.image);
      this.userName.set(data.name);
      this.authView.set('authorized');
      this.router.navigate(['/home']);
    } else {
      this.signOut();
    }
  }

  userDataSetser(data: ApiUserInfo): void {
    if (data.image) {
      localStorage.setItem('userImage', data.image);
      this.userImage.set(data.image);
    }

    localStorage.setItem('userName', data.name);
    this.userName.set(data.name);
    this.userInfo.set(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
  }
  userDataRemover() {
    localStorage.removeItem('userInfo');
    this.userInfo.set(null);
  }
  signOut() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userImage');
    localStorage.removeItem('userName');
    this.userToken.set(null);
    this.userImage.set(null);
    this.userName.set(null);
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
