import {
  Component,
  Input,
  OnChanges,
  OnInit,
  signal,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
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
export class AllDoctors implements OnInit, OnChanges {
  allDoctors = signal<DoctorData[]>([]);
  @Input() speciality!: string | null;
  availableIcon = faCircleCheck;
  notAvailableIcon = faCircleXmark;
  constructor(private docotr: DoctorService) {}

  ngOnInit(): void {
    console.log('jjjjjjjjjjjjjjjjjj');
    this.docotr.doctors().subscribe({
      next: (response) => {
        this.allDoctors.update((data) => response.data);
      },
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log('changes', changes);
    console.log(' @Input() speciality!: string | null;', this.speciality);
  }
}
