import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
@Component({
  selector: 'app-appointment',
  imports: [FontAwesomeModule, CurrencyPipe, RelatedDoctors, AppointmentBooking],
  templateUrl: './appointment.html',
  styleUrl: './appointment.css',
})
export class Appointment implements OnInit {
  docId!: string;
  checkIcon = faCheck;
  xIcon = faX;
  infoIcon = faCircleInfo;
  myDoctor: DoctorData = {} as DoctorData;
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
          this.myDoctor = res.data;
          console.log(res.data);
          this.cdr.detectChanges();
        }
      },
      error: (err) => {
        console.log('error from getDoctor ', err);
      },
    });
  }
}
