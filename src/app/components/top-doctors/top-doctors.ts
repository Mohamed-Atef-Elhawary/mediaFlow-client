import { Component, signal, OnInit } from '@angular/core';
import { DoctorData } from '../../interfaces/doctor-data';
import { DoctorService } from '../../services/doctor-service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-top-doctors',
  imports: [FontAwesomeModule],
  templateUrl: './top-doctors.html',
  styleUrl: './top-doctors.css',
})
export class TopDoctors implements OnInit {
  allDoctors = signal<DoctorData[]>([]);
  availableIcon = faCircleCheck;
  notAvailableIcon = faCircleXmark;
  constructor(private docotr: DoctorService) {}

  ngOnInit(): void {
    this.docotr.doctors().subscribe({
      next: (response) => {
        this.allDoctors.update((data) => response.data);
      },
    });
  }
}
