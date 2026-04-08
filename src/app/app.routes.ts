import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./pages/home/home').then((c) => c.Home) },

  {
    path: 'doctors',
    loadComponent: () => import('./pages/doctors/doctors').then((c) => c.Doctors),
  },
  { path: 'about', loadComponent: () => import('./pages/about/about').then((c) => c.About) },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((c) => c.Contact),
  },
];
