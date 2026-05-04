import { Injectable, signal } from '@angular/core';
import { AuthService } from './auth-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response';
import { ApiUserInfo } from '../interfaces/api-user-info';
import { LoginResponse } from '../interfaces/login-response';
import { AppointmentRequest } from '../interfaces/appointment-request';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private auth: AuthService,
    private http: HttpClient,
  ) {}

  profile(): Observable<ApiResponse> {
    // console.log(this.auth.userToken());
    return this.http.get<ApiResponse>(`${environment.backendUrl}user/profile`, {
      headers: new HttpHeaders({
        authorization: `Bearer ${this.auth.userData()?.token}`,
      }),
    });
  }

  updateProfile(data: FormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${environment.backendUrl}user/update`, data, {
      headers: new HttpHeaders({
        authorization: `Bearer ${this.auth.userData()?.token}}`,
      }),
    });
  }

  bookAppointment(data: AppointmentRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${environment.backendUrl}user/book`, data, {
      headers: new HttpHeaders({
        authorization: `Bearer ${this.auth.userData()?.token}}`,
      }),
    });
  }
  appointmentsList(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${environment.backendUrl}user/appointments`, {
      headers: new HttpHeaders({
        authorization: `Bearer ${this.auth.userData()?.token}}`,
      }),
    });
  }
  cancleAppointment(appointmentId: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${environment.backendUrl}user/cancel`,
      { appointmentId },
      {
        headers: new HttpHeaders({
          authorization: `Bearer ${this.auth.userData()?.token}}`,
        }),
      },
    );
  }
}
