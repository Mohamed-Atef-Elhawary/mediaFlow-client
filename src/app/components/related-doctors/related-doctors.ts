import { Component, computed, input, OnChanges } from '@angular/core';
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DoctorService } from '../../services/doctor-service';
import { DoctorData } from '../../interfaces/doctor-data';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-related-doctors',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './related-doctors.html',
  styleUrl: './related-doctors.css',
})
export class RelatedDoctors {
  availableIcon = faCircleCheck;
  notAvailableIcon = faCircleXmark;
  relatedDoctors: DoctorData[] = [];
  constructor(private docotrService: DoctorService) {}
  docId = input.required<string>();
  docSpeciality = input.required<string>();

  reletedDocs = computed(() => {
    return this.docotrService
      .allDocs()
      .filter((doc) => doc._id !== this.docId() && doc.speciality === this.docSpeciality());
  });
  ngOnInit(): void {
    // this.docotr.doctors().subscribe({
    //   next: (response) => {
    //     this.docotr.allDoctors.set(response.data);
    //   },
    // });
  }
}
