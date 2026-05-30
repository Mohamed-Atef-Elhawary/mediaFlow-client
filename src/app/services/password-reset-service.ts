import { Injectable } from '@angular/core';
import { ApiResponse } from '../interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PasswordResetService {
  constructor(private http: HttpClient) {}

  requestPasswordReset(email: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${environment.backendUrl}password/request`, { email });
  }
  resetPassword(data: { token: string; newPassword: string }): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${environment.backendUrl}password/reset`, data);
  }
}
