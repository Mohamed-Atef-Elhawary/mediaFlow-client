import { Component, computed, input, OnChanges, signal } from '@angular/core';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DoctorService } from '../../services/doctor-service';
import { DoctorData } from '../../interfaces/doctor-data';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { toastConfig } from '../../config/toastConfig';

@Component({
  selector: 'app-related-doctors',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './related-doctors.html',
  styleUrl: './related-doctors.css',
})
export class RelatedDoctors {
  availableIcon = faCircleCheck;
  notAvailableIcon = faCircleXmark;
  reletedDocs = signal<DoctorData[] | []>([]);
  constructor(
    private docotrService: DoctorService,
    private toastr: ToastrService,
  ) {}
  docId = input.required<string>();
  docSpeciality = input.required<string>();

  ngOnChanges(): void {
    this.docotrService.doctors().subscribe({
      next: (response) => {
        if (response.success) {
          const data = response.data;
          if (data) {
            this.reletedDocs.update(() => {
              return data.filter(
                (doc: DoctorData) =>
                  doc._id !== this.docId() && doc.speciality === this.docSpeciality(),
              );
            });
          }
        }
      },
      error: (err) => {
        this.toastr.error(err.message, 'Error', toastConfig.errorConfig);
      },
    });
  }
}
