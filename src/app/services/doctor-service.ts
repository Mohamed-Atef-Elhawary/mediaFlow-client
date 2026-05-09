import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { DoctorData } from '../interfaces/doctor-data';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  constructor(private http: HttpClient) {}

  allDoctors = signal<DoctorData[]>([] as DoctorData[]);

  doctor(id: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${environment.backendUrl}doctor/doctor/${id}`);
  }

  refresher: WritableSignal<void> = signal(undefined);

  doctors(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${environment.backendUrl}doctor/list`);
  }

  allDocs = toSignal(
    toObservable(this.refresher).pipe(
      switchMap(() =>
        this.doctors().pipe(
          catchError(() => {
            console.log('offffffffffffffffffff');
            return of({ success: false, message: 'server is down', data: null });
          }),
        ),
      ),
    ),
    {
      initialValue: {} as ApiResponse,
    },
  );
}
