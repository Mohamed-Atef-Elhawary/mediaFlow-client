import { Component, computed, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../services/auth-service';

import { LoginResponse } from '../../interfaces/login-response';
import { ReviewDirective } from '../../directives/review';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-write-review',
  imports: [ReviewDirective, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './write-review.html',
  styleUrl: './write-review.css',
})
export class WriteReview implements OnInit {
  starIcon = faStar;
  reviewForm!: FormGroup;
  rate: WritableSignal<number> = signal(0);
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
  ) {}
  userData: Signal<LoginResponse | null> = computed(() => this.authService.userData());

  getDocData(): { name: String; image: string; id: string } | null {
    let myDoctor = localStorage.getItem('myDoctor');
    if (myDoctor) {
      let data = JSON.parse(myDoctor);
      return { name: data.name, image: data.image, id: data._id };
    }

    return null;
  }
  ngOnInit() {
    this.makeForm();
  }
  makeForm() {
    this.reviewForm = this.fb.group({
      docId: [this.getDocData()?.id],
      rating: [this.rate(), [Validators.required, Validators.min(1), Validators.max(5)]],
      comment: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(300)]],
    });
  }
}
