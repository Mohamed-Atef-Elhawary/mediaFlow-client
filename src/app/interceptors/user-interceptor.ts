import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';

export const userInterceptor: HttpInterceptorFn = (req, next) => {
  let clonedRequest = req;
  const token = inject(AuthService).userData()?.token;
  const url = req.url;
  const endPoints = [
    'user/profile',
    'user/update',
    'user/book',
    'user/appointments',
    'user/cancel',
    'review/add-review',
    'review/all-reviews',
    'review/helpful-review',
  ];

  const exsits = endPoints.some((poine) => url.includes(poine));
  if (exsits) {
    clonedRequest = clonedRequest.clone({ setHeaders: { authorization: `Bearer ${token}` } });
  }
  return next(clonedRequest);
};
