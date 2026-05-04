import { ChangeDetectorRef, Component, computed, OnInit, signal } from '@angular/core';
import { DoctorService } from '../../services/doctor-service';
import { ActivatedRoute } from '@angular/router';
import { DoctorData } from '../../interfaces/doctor-data';
import { ToastrService } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { CurrencyPipe } from '@angular/common';
import { RelatedDoctors } from '../../components/related-doctors/related-doctors';
import { AppointmentBooking } from '../../components/appointment-booking/appointment-booking';
import { DocRank } from '../../components/doc-rank/doc-rank';
import { DoctorRank } from '../../interfaces/doctor-rank';
@Component({
  selector: 'app-appointment',
  imports: [FontAwesomeModule, CurrencyPipe, RelatedDoctors, AppointmentBooking, DocRank],
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
  constructor(
    private doctor: DoctorService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
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
          localStorage.setItem('myDoctor', JSON.stringify(this.myDoctor()));
          console.log(this.myDoctor());
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.log('error from getDoctor ', err);
      },
    });
  }
}
