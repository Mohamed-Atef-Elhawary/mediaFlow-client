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
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RankingService } from '../../services/ranking-service';

@Component({
  selector: 'app-write-review',
  imports: [ReviewDirective, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './write-review.html',
  styleUrl: './write-review.css',
})
export class WriteReview implements OnInit {
  starIcon = faStar;
  reviewForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private rankingService: RankingService,
    private fb: FormBuilder,
  ) {}
  userData: Signal<LoginResponse | null> = computed(() => this.authService.userData());
  doctorData = input.required<{ name: string; _id: string; image: string }>();

  ngOnInit() {
    this.makeForm();
    console.log(
      '  doctorData = input.required<{ name: string; id: string; image: string }>();',
      this.doctorData(),
    );
  }
  makeForm() {
    this.reviewForm = this.fb.group({
      docId: [this.doctorData()._id],
      comment: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(300)]],
    });
  }
  updateDocRank(rank: number): void {
    this.rankingService.docRank.set(rank);
  }
  submit() {
    this.reviewForm.addControl('rank', this.fb.control(this.rankingService.docRank()));
    console.log(this.reviewForm.value);
    console.log('rankingService.docRank', this.rankingService.docRank());
  }
}
