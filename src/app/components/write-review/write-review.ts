import {
  ChangeDetectorRef,
  Component,
  computed,
  input,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { AuthService } from '../../services/auth-service';

import { LoginResponse } from '../../interfaces/login-response';
import { ReviewDirective } from '../../directives/review';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RankingService } from '../../services/ranking-service';
import { NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { toastConfig } from '../../config/toastConfig';

@Component({
  selector: 'app-write-review',
  imports: [ReviewDirective, FontAwesomeModule, ReactiveFormsModule, NgClass],
  templateUrl: './write-review.html',
  styleUrl: './write-review.css',
})
export class WriteReview implements OnInit {
  starIcon = faStar;
  xIcon = faXmark;
  reviewForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private rankingService: RankingService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {}
  userData: Signal<LoginResponse | null> = computed(() => this.authService.userData());
  doctorData = input.required<{ name: string; _id: string; image: string }>();

  ngOnInit() {
    this.makeForm();
  }
  makeForm() {
    this.reviewForm = this.fb.group({
      docId: [this.doctorData()._id],
      rank: [0, [Validators.required, Validators.max(5), Validators.min(1)]],
      comment: ['', [Validators.minLength(2), Validators.maxLength(300)]],
    });
  }
  updateDocRank(rank: number): void {
    this.rankingService.docRank.set(rank);
    this.reviewForm.patchValue({ rank: this.rankingService.docRank() });
  }
  submit() {
    // const rank = this.fb.control(this.rankingService.docRank(), [
    //   // Validators.required,
    //   Validators.min(1),
    //   Validators.max(5),
    // ]);
    // console.log('rank', rank);
    // this.reviewForm.addControl(
    //   'rank',
    //   this.fb.control(this.rankingService.docRank(), [
    //     Validators.required,
    //     Validators.min(1),
    //     Validators.max(5),
    //   ]),
    // );
    // this.reviewForm.addControl('rank', rank);

    // console.log(this.reviewForm.value);
    // console.log('this.reviewForm.valid', this.reviewForm.valid);
    if (this.reviewForm.valid) {
      this.rankingService.addReview(this.reviewForm.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
          this.toastr.error(err.message, 'Error', toastConfig.errorConfig);
        },
      });
      this.endReviewing();
    }
    // console.log('rankingService.docRank', this.rankingService.docRank());
  }

  endReviewing(): void {
    console.log('endReviewing()');
    this.rankingService.backDrop.set(false);
  }
}
