import {
  Component,
  computed,
  OnInit,
  signal,
  input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
  WritableSignal,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';

import { DoctorRank, RankData } from '../../interfaces/doctor-rank';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { ReviewDirective } from '../../directives/review';

import { RouterLink } from '@angular/router';
import { last } from 'rxjs';
import { CommonModule, NgClass, NgStyle } from '@angular/common';
import { RankingService } from '../../services/ranking-service';

@Component({
  selector: 'app-doc-rank',
  imports: [FontAwesomeModule, ReviewDirective, NgStyle, CommonModule],
  templateUrl: './doc-rank.html',
  styleUrl: './doc-rank.css',
})
export class DocRank implements OnInit, OnChanges {
  arrow = faArrowRight;
  starIcon = faStar;
  ranking = input.required<DoctorRank>();
  docRank: WritableSignal<RankData> = signal({
    rank: { decimal: 0, frag: 0 },
    totalReviewers: 0,
    ratingDistribution: {},
  });
  @Output() onreview: EventEmitter<number> = new EventEmitter<number>();
  constructor(
    private rankingService: RankingService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    // console.log(this.docRank());
  }
  ngOnChanges(): void {
    const { rank: rankAlias, totalReviewers } = this.ranking();
    if (rankAlias !== undefined && totalReviewers) {
      let ranking: string[] = rankAlias.toString().split('.');

      if (ranking[1] && ranking[1].length > 2) {
        ranking[1] = ranking[1].slice(0, 1);
      }
      let rank = {
        decimal: Number(ranking[0]),
        frag: Number(ranking[1] || 0),
      };

      let ratingDistribution: { [key: number]: string } = {};
      for (let key in this.ranking().ratingDistribution) {
        if (this.ranking().ratingDistribution[key]) {
          let rate = (this.ranking().ratingDistribution[key] / totalReviewers) * 100;
          ratingDistribution[key] = `${rate}%`;
        } else {
          ratingDistribution[key] = `${this.ranking().ratingDistribution[key]}%`;
        }
      }
      this.docRank.set({
        rank,
        totalReviewers,
        ratingDistribution,
      });
      this.cdr.detectChanges();
    }

    console.log(this.docRank());
    // if (this.ranking()) {
    //     this.docRank.set(() => {
    //   let ranking: string[] = this.ranking()?.rank.toString().split('.');
    //   if (ranking[1] && ranking[1].length > 2) {
    //     ranking[1] = ranking[1].slice(0, 1);
    //   }
    //   let rank = {
    //     decimal: Number(ranking[0]),
    //     frag: Number(ranking[1] || 0),
    //   };
    //   let totalReviewers = this.ranking().totalReviewers;
    //   let ratingDistribution: { [key: number]: string } = {};
    //   for (let key in this.ranking().ratingDistribution) {
    //     if (this.ranking().ratingDistribution[key]) {
    //       let rate = (this.ranking().ratingDistribution[key] / totalReviewers) * 100;
    //       ratingDistribution[key] = `${rate}%`;
    //     } else {
    //       ratingDistribution[key] = `${this.ranking().ratingDistribution[key]}%`;
    //     }
    //   }
    //   return {
    //     rank,
    //     totalReviewers,
    //     ratingDistribution,
    //   };
    // });
    // }
  }

  emitReviewing(rank: number): void {
    this.onreview.emit(rank);
  }
}
