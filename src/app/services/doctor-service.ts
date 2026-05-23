import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { DoctorData } from '../interfaces/doctor-data';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  private doctorsSignal = signal<DoctorData[]>([]);

  allDocs = this.doctorsSignal.asReadonly();

  constructor(private http: HttpClient) {
    this.loadDoctors();
  }

  doctor(id: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${environment.backendUrl}doctor/doctor/${id}`);
  }

  loadDoctors() {
    this.http
      .get<ApiResponse>(`${environment.backendUrl}doctor/list`)
      .pipe(catchError(() => of({ success: false, message: 'server is down', data: [] })))
      .subscribe((response) => {
        if (response.data && response.success) {
          this.doctorsSignal.set(response.data);
        }
      });
  }

  // refresher: WritableSignal<void> = signal(undefined);

  // doctors(): Observable<ApiResponse> {
  //   return this.http.get<ApiResponse>(`${environment.backendUrl}doctor/list`);
  // }

  // allDocs = toSignal(
  //   toObservable(this.refresher).pipe(
  //     switchMap(() =>
  //       this.doctors().pipe(
  //         catchError(() => {
  //           return of({ success: false, message: 'server is down', data: null });
  //         }),
  //       ),
  //     ),
  //   ),
  //   { initialValue: {} as ApiResponse },
  // );
}
