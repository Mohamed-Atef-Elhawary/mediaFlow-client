import { Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response';
import { AppointmentRequest } from '../interfaces/appointment-request';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  profile(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${environment.backendUrl}user/profile`);
  }

  updateProfile(data: FormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${environment.backendUrl}user/update`, data);
  }

  bookAppointment(data: AppointmentRequest): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${environment.backendUrl}user/book`, data);
  }
  appointmentsList(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${environment.backendUrl}user/appointments`);
  }
  cancleAppointment(appointmentId: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${environment.backendUrl}user/cancel`, { appointmentId });
  }
}
