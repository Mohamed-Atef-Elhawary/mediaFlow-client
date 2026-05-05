import {
  ChangeDetectorRef,
  Component,
  computed,
  OnInit,
  Signal,
  signal,
  ViewChild,
  ViewContainerRef,
  WritableSignal,
} from '@angular/core';
import { DoctorService } from '../../services/doctor-service';
import { ActivatedRoute } from '@angular/router';
import { DoctorData } from '../../interfaces/doctor-data';
import { ToastrService } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { CurrencyPipe, NgClass } from '@angular/common';
import { RelatedDoctors } from '../../components/related-doctors/related-doctors';
import { AppointmentBooking } from '../../components/appointment-booking/appointment-booking';
import { DocRank } from '../../components/doc-rank/doc-rank';
import { DoctorRank } from '../../interfaces/doctor-rank';
import { RankingService } from '../../services/ranking-service';
@Component({
  selector: 'app-appointment',
  imports: [FontAwesomeModule, CurrencyPipe, RelatedDoctors, AppointmentBooking, DocRank, NgClass],
  templateUrl: './appointment.html',
  styleUrl: './appointment.css',
})
export class Appointment implements OnInit {
  docId!: string;
  checkIcon = faCheck;
  xIcon = faX;
  infoIcon = faCircleInfo;

  myDoctor = signal<DoctorData>({} as DoctorData);
  ranking = computed<DoctorRank>(() => {
    return {
      rank: this.myDoctor().rank,
      totalReviewers: this.myDoctor().totalReviewers,
      ratingDistribution: this.myDoctor().ratingDistribution,
    };
  });
  @ViewChild('review', { read: ViewContainerRef }) review!: ViewContainerRef;
  backDrop: Signal<boolean> = computed(() => this.rankingService.backDrop());

  constructor(
    private doctor: DoctorService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private rankingService: RankingService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('docId');
      if (id) {
        this.docId = id;
        this.getDoctor();
      }
    });
  }

  getDoctor() {
    this.doctor.doctor(this.docId).subscribe({
      next: (res) => {
        if (res.success) {
          this.myDoctor.set(res.data);
          localStorage.setItem('myDoctor', JSON.stringify(res.data));
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.log('error from getDoctor ', err);
      },
    });
  }

  async getReviewComp() {
    const myComp = await import('../../components/write-review/write-review').then(
      (comp) => comp.WriteReview,
    );

    this.review.clear();
    const componentRef = this.review.createComponent(myComp);
    // console.log('componentRef', componentRef);
    if (this.myDoctor()) {
      componentRef.setInput('doctorData', {
        name: this.myDoctor().name,
        _id: this.myDoctor()._id,
        image: this.myDoctor().image,
      });
    }
  }
  startReviewing(rank: number): void {
    // console.log('from appointment rank', rank);
    this.rankingService.docRank.set(rank);
    this.rankingService.backDrop.set(true);
    this.getReviewComp();
  }
  isBackDropToCancel(event: PointerEvent) {
    if (event.target === event.currentTarget) {
      this.rankingService.backDrop.set(false);
      this.review.clear();
    }
    // console.log('event.target', event.target);
    // console.log('event.currentTarget', event.currentTarget);
  }
}
