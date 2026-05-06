import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { ApiResponse } from '../interfaces/api-response';
import { environment } from '../../environments/environment';
import { Review, ReviewData } from '../interfaces/doctor-rank';
import { AuthService } from './auth-service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  docRank: WritableSignal<number> = signal(0);
  backDrop: WritableSignal<boolean> = signal(false);

  constructor(
    private http: HttpClient,
    private authSerive: AuthService,
  ) {}
  addReview(reviewData: ReviewData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${environment.backendUrl}review/add-review`, reviewData, {
      headers: new HttpHeaders({
        authorization: `Bearer ${this.authSerive.userData()?.token}`,
      }),
    });
  }

  allReviews(docId: string): Observable<any> {
    return this.http
      .post<ApiResponse>(
        `${environment.backendUrl}review/all-reviews`,
        { docId },
        {
          headers: new HttpHeaders({
            authorization: `Bearer ${this.authSerive.userData()?.token}`,
          }),
        },
      )
      .pipe(
        map((res): Observable<Review[] | never> => {
          if (res.success) {
            return res.data;
          } else {
            return throwError(() => Error(res.message));
          }
        }),
        catchError((err): Observable<never> => throwError(() => new Error(err))),
      );
  }
  // private allReviews = (docId: string): Observable<ApiResponse> => {
  //   return this.http
  //     .post<ApiResponse>(
  //       `${environment.backendUrl}review/all-reviews`,
  //       { docId },
  //       {
  //         headers: new HttpHeaders({
  //           authorization: `Bearer ${this.authSerive.userData()?.token}`,
  //         }),
  //       },
  //     )
  //     .pipe(
  //       map((res) => {
  //         if (res.success) {
  //           return res.data;
  //         } else {
  //           return throwError(() => Error(res.message));
  //         }
  //       }),
  //       catchError((err) => throwError(() => new Error(err))),
  //     );
  // };

  // reviews = toSignal(this.allReviews(this.docIdSignal()));

  // toSignal(this.allReviews(this.docIdSignal()), { initialValue: [] });
}
