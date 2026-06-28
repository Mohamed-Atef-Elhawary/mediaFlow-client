import { Component, OnInit, signal } from '@angular/core';
import { DoctorService } from '../../services/doctor-service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { DoctorData } from '../../interfaces/doctor-data';
import { ToastrService } from 'ngx-toastr';
import { toastConfig } from '../../config/toastConfig';

@Component({
  selector: 'app-top-doctors',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './top-doctors.html',
  styleUrl: './top-doctors.css',
})
export class TopDoctors implements OnInit {
  availableIcon = faCircleCheck;
  notAvailableIcon = faCircleXmark;
  topDoctors = signal<DoctorData[] | []>([]);
  constructor(
    private docotrService: DoctorService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.docotrService.doctors().subscribe({
      next: (response) => {
        if (response.success) {
          const data = response.data;
          if (data) {
            this.topDoctors.set(data.slice(0, 8));
          }
        }
      },
      error: (err) => {
        this.toastr.error(err.message, 'Error', toastConfig.errorConfig);
      },
    });
  }
}
