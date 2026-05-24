import { Injectable, Signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, Observable, of, shareReplay, Subject, switchMap } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response';
import { HttpClient } from '@angular/common/http';
import { DoctorData } from '../interfaces/doctor-data';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class DoctorService {
  reFreshDocs$ = new Subject<void>();
  constructor(private http: HttpClient) {
    this.reFreshDocs$.next();
  }

  doctor(id: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${environment.backendUrl}doctor/doctor/${id}`);
  }

  private doctors: Observable<ApiResponse> = this.reFreshDocs$.pipe(
    switchMap(() => {
      return this.http
        .get<ApiResponse>(`${environment.backendUrl}doctor/list`)
        .pipe(
          catchError(() =>
            of({ success: false, message: 'server is down', data: [] as DoctorData[] }),
          ),
        );
    }),
    shareReplay(1),
  );

  allDocs: Signal<ApiResponse | undefined> = toSignal<ApiResponse>(this.doctors, {
    initialValue: undefined,
  });

  // allDocs = toSignal<ApiResponse>(this.doctors, { requireSync: true });
}
