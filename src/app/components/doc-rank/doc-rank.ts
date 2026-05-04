import { Component, computed, OnInit, Signal, signal, input } from '@angular/core';

import { DoctorRank } from '../../interfaces/doctor-rank';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ReviewDirective } from '../../directives/review';

import { RouterLink } from '@angular/router';
import { last } from 'rxjs';
import { CommonModule, NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-doc-rank',
  imports: [FontAwesomeModule, ReviewDirective, NgClass, NgStyle, CommonModule],
  templateUrl: './doc-rank.html',
  styleUrl: './doc-rank.css',
})
export class DocRank implements OnInit {
  arrow = faArrowRight;
  ranking2 = input.required<DoctorRank>();
  ranking = signal<DoctorRank>({
    rank: 3.3333,
    totalReviewers: 2,
    ratingDistribution: {
      1: 1,
      2: 0,
      3: 0,
      4: 0,
      5: 1,
    },
  });

  docRank: Signal<any> = computed(() => {
    let ranking: string[] = this.ranking().rank.toString().split('.');
    if (ranking[1] && ranking[1].length > 2) {
      ranking[1] = ranking[1].slice(0, 1);
    }
    let rank = {
      decimal: Number(ranking[0]),
      frag: Number(ranking[1] || 0),
    };

    let totalReviewers = this.ranking().totalReviewers;

    let ratingDistribution: { [key: number]: string } = {};

    for (let key in this.ranking().ratingDistribution) {
      if (this.ranking().ratingDistribution[key]) {
        let rate = (this.ranking().ratingDistribution[key] / totalReviewers) * 100;
        ratingDistribution[key] = `${rate}%`;
      } else {
        ratingDistribution[key] = `${this.ranking().ratingDistribution[key]}%`;
      }
    }
    return {
      rank,
      totalReviewers,
      ratingDistribution,
    };
  });

  starIcon = faStar;

  ngOnInit() {
    console.log(this.docRank());
  }
}
