import { Component, OnInit, signal } from '@angular/core';
import { SpecialityList } from '../../components/speciality-list/speciality-list';
import { AllDoctors } from '../../components/all-doctors/all-doctors';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctors',
  imports: [SpecialityList, AllDoctors],
  templateUrl: './doctors.html',
  styleUrl: './doctors.css',
})
export class Doctors implements OnInit {
  speciality = signal<string | null>(null);
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      if (params.get('speciality')) {
        this.speciality.set(params.get('speciality'));
      }
    });
  }
  getSpeciality(event: string) {
    this.speciality.set(event);
    // console.log('from doctor', event);
  }
}
