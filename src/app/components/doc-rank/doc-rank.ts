import { Component, OnInit, signal } from '@angular/core';

import { DoctorRank } from '../../interfaces/doctor-rank';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-doc-rank',
  imports: [FontAwesomeModule],
  templateUrl: './doc-rank.html',
  styleUrl: './doc-rank.css',
})
export class DocRank implements OnInit {
  // ranking = input.required<DoctorRank>();
  ranking = signal<DoctorRank>({
    rank: 3.333333333,
    totalReviewers: 3,
    ratingDistribution: {
      1: 0,
      2: 1,
      3: 1,
      4: 0,
      5: 1,
    },
  });
  starIcon = faStar;
  ngOnInit() {
    console.log(this.ranking());
  }
  setColor(e: any, i: number) {
    e.target.classList.add('text-primary');
  }
}
