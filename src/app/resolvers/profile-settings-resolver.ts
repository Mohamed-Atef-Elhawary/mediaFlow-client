import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { UserService } from '../services/user-service';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/api-response';

export const profileSettingsResolver: ResolveFn<Observable<ApiResponse>> = (route, state) => {
  const userService = inject(UserService);
  return userService.profile();
};
