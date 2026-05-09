import { ResolveFn } from '@angular/router';
import { ApiResponse } from '../interfaces/api-response';
import { inject } from '@angular/core';
import { DoctorService } from '../services/doctor-service';
import { Observable } from 'rxjs';

export const doctorsResolver: ResolveFn<Observable<ApiResponse>> = (route, state) => {
  const doctorService = inject(DoctorService);
  return doctorService.doctors();
};
