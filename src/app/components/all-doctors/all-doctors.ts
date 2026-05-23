import { Component, computed, Input, Signal } from '@angular/core';
import { DoctorData } from '../../interfaces/doctor-data';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { DoctorService } from '../../services/doctor-service';
import { RouterLink } from '@angular/router';
import { FilterBySpecialtyPipe } from '../../pipes/filter-by-specialty-pipe';

@Component({
  selector: 'app-all-doctors',
  imports: [RouterLink, FontAwesomeModule, FilterBySpecialtyPipe],
  templateUrl: './all-doctors.html',
  styleUrl: './all-doctors.css',
})
export class AllDoctors {
  @Input() speciality!: string | null;
  availableIcon = faCircleCheck;
  notAvailableIcon = faCircleXmark;
  constructor(private docotrService: DoctorService) {}
  allDoctors: Signal<DoctorData[]> = computed(() => {
    return this.docotrService.allDocs();
  });
}
