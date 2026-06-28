import { Component, Input, OnInit, signal } from '@angular/core';
import { DoctorData } from '../../interfaces/doctor-data';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { DoctorService } from '../../services/doctor-service';
import { RouterLink } from '@angular/router';
import { FilterBySpecialtyPipe } from '../../pipes/filter-by-specialty-pipe';
import { toastConfig } from '../../config/toastConfig';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-doctors',
  imports: [RouterLink, FontAwesomeModule, FilterBySpecialtyPipe],
  templateUrl: './all-doctors.html',
  styleUrl: './all-doctors.css',
})
export class AllDoctors implements OnInit {
  @Input() speciality!: string | null;
  availableIcon = faCircleCheck;
  notAvailableIcon = faCircleXmark;
  allDoctors = signal<DoctorData[] | []>([]);
  constructor(
    private docotrService: DoctorService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.docotrService.doctors().subscribe({
      next: (response) => {
        if (response.success) {
          this.allDoctors.set(response.data);
        }
      },
      error: (err) => {
        this.toastr.error(err.message, 'Error', toastConfig.errorConfig);
      },
    });
  }
}
