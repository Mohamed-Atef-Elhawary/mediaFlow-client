import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { ApiResponse } from '../interfaces/api-response';
import { environment } from '../../environments/environment';
import { ReviewData } from '../interfaces/doctor-rank';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  docRank: WritableSignal<number> = signal(0);
  backDrop: WritableSignal<boolean> = signal(false);

  constructor(private http: HttpClient) {}

  addReview(reviewData: ReviewData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${environment.backendUrl}review/add-review`, reviewData);
  }

  allReviews(docId: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${environment.backendUrl}review/all-reviews`, { docId });
  }

  helpfulReview(reviewId: string): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${environment.backendUrl}review/helpful-review`, {
      reviewId,
    });
  }
}
