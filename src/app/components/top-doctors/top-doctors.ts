import { Component, computed, Signal } from '@angular/core';
import { DoctorService } from '../../services/doctor-service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { DoctorData } from '../../interfaces/doctor-data';

@Component({
  selector: 'app-top-doctors',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './top-doctors.html',
  styleUrl: './top-doctors.css',
})
export class TopDoctors {
  availableIcon = faCircleCheck;
  notAvailableIcon = faCircleXmark;
  constructor(private docotrService: DoctorService) {}

  allDoctors: Signal<any[]> = computed(() => {
    const data = this.docotrService.allDocs().data;
    return data || [];
  });
  topDoctors: Signal<DoctorData[]> = computed(() => this.allDoctors().slice(0, 8));
}
