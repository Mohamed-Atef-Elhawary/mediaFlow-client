import { Pipe, PipeTransform } from '@angular/core';
import { DoctorData } from '../interfaces/doctor-data';

@Pipe({
  name: 'filterBySpecialty',
})
export class FilterBySpecialtyPipe implements PipeTransform {
  transform(doctors: DoctorData[], speciality: string | null): DoctorData[] {
    if (speciality) {
      return doctors.filter((doc) => doc.speciality === speciality);
    } else {
      return doctors;
    }
  }
}
