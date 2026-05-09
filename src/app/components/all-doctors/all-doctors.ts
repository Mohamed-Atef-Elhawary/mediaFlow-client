import { Component, computed, Input, Signal } from '@angular/core';
import { DoctorData } from '../../interfaces/doctor-data';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faCircleCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { DoctorService } from '../../services/doctor-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  constructor(
    private docotrService: DoctorService,
    private route: ActivatedRoute,
  ) {}
  allDoctors: Signal<DoctorData[]> = computed(() => {
    console.log(this.docotrService.allDocs());
    console.log(this.docotrService.allDocs().data);
    return this.docotrService.allDocs().data || [];
  });
}

// allDoctors: WritableSignal<DoctorData[]> = signal([]);
// constructor(
//   private docotrService: DoctorService,
//   private route: ActivatedRoute,
// ) {
//   // this.allDoctors.set(this.route.snapshot.data['docs'].data);
//   // this.route.data.subscribe((res) => {
//   //   this.allDoctors.set(res['docs'].data);
//   // });
// }
