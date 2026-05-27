import { ResolveFn } from '@angular/router';
import { ApiResponse } from '../interfaces/api-response';
import { inject } from '@angular/core';
import { UserService } from '../services/user-service';

export const myAppointmentsResolver: ResolveFn<ApiResponse> = (route, state) => {
  const userService = inject(UserService);
  return userService.appointmentsList();
};
