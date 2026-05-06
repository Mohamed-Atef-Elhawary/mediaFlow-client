import { Component, input, OnInit, signal, WritableSignal } from '@angular/core';
import { RankingService } from '../../services/ranking-service';
import { Review } from '../../interfaces/doctor-rank';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { DatePipe, NgClass } from '@angular/common';

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
  constructor(private ranckingService: RankingService) {}
  ngOnInit(): void {
    this.ranckingService.allReviews('69f4bb6da378a8ed40833d5e').subscribe({
      next: (res) => {
        this.reviews.set(res);
        console.log(this.reviews()[0].helpfulVotes.length);
      },

      error: (err) => {
        console.log(err);
      },
    });
  }
}
