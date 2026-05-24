import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { ApiResponse } from '../interfaces/api-response';
import { environment } from '../../environments/environment';
import { Review, ReviewData } from '../interfaces/doctor-rank';
import { AuthService } from './auth-service';
import { catchError, map, Observable, throwError } from 'rxjs';

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

  allReviews(docId: string): Observable<Review[]> {
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
        map((response) => {
          if (response.success) {
            return response.data;
          }
          return [] as Review[];
        }),
      );
  }

  helpfulReview(reviewId: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(
      `${environment.backendUrl}review/helpful-review`,
      { reviewId },
      {
        headers: new HttpHeaders({
          authorization: `Bearer ${this.authSerive.userData()?.token}`,
        }),
      },
    );
  }
}
