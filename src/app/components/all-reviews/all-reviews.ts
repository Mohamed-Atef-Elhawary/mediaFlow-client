import { Component, input, OnInit, signal, WritableSignal } from '@angular/core';
import { RankingService } from '../../services/ranking-service';
import { Review } from '../../interfaces/doctor-rank';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { DatePipe, NgClass } from '@angular/common';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-all-reviews',
  imports: [FontAwesomeModule, NgClass, DatePipe],
  templateUrl: './all-reviews.html',
  styleUrl: './all-reviews.css',
})
export class AllReviews implements OnInit {
  reviews: WritableSignal<Review[]> = signal([]);
  // helpfulLength:WritableSignal<number>=signal(0)
  docId = input.required<string>();
  starIcon = faStar;
  constructor(
    private ranckingService: RankingService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.ranckingService.allReviews(this.docId()).subscribe({
      next: (res) => {
        this.reviews.set(res);
        console.log(this.reviews());
      },

      error: (err) => {
        console.log(err);
      },
    });
  }

  isExists(helpfulVotes: string[]): boolean {
    const id = this.authService.userData()?.id;
    if (id) {
      return helpfulVotes.includes(id);
    }
    return false;
  }
  helpfulReview(reviewId: string, helpfulVotes: string[]): void {
    const isExists = this.isExists(helpfulVotes);

    if (isExists) {
      //remove userId
      this.removeUserId(reviewId);
    } else {
      //add userId
      this.addUserId(reviewId);
    }

    this.ranckingService.helpfulReview(reviewId).subscribe(console.log);
  }

  removeUserId(reviewId: string): void {
    const userId = this.authService.userData()?.id;
    this.reviews.update((value) => {
      return value.map((review) => {
        if (review._id === reviewId) {
          review.helpfulVotes = review.helpfulVotes.filter((id) => id !== userId);
        }
        return review;
      });
    });
  }

  addUserId(reviewId: string) {
    const userId = this.authService.userData()?.id;
    this.reviews.update((value) => {
      return value.map((review) => {
        if (review._id === reviewId) {
          if (userId) {
            review.helpfulVotes.push(userId);
          }
        }
        return review;
      });
    });
  }
}
