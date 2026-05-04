import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { redirectGuard } from './guards/redirect-guard';
import { profileSettingsResolver } from './resolvers/profile-settings-resolver';
export const routes: Routes = [
  { path: '', redirectTo: 'outer', pathMatch: 'full' },
  {
    path: 'outer',
    loadComponent: () => import('./pages/outer-page/outer-page').then((c) => c.OuterPage),
    canActivate: [redirectGuard],
    title: 'MediaFlow',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then((c) => c.Home),
    canActivate: [authGuard],
  },

  {
    path: 'doctors',
    loadComponent: () => import('./pages/doctors/doctors').then((c) => c.Doctors),
  },
  { path: 'about', loadComponent: () => import('./pages/about/about').then((c) => c.About) },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact').then((c) => c.Contact),
  },
  // //////////////////////////////////////////////////////////
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile').then((c) => c.Profile),
    resolve: { profileResolver: profileSettingsResolver },
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/profile-settings/profile-settings').then((c) => c.ProfileSettings),
    resolve: { profileResolver: profileSettingsResolver },
  },
  {
    path: 'appointment/:docId',
    loadComponent: () => import('./pages/appointment/appointment').then((c) => c.Appointment),
  },
  {
    path: 'myappointment',
    loadComponent: () =>
      import('./pages/my-appointment/my-appointment').then((c) => c.MyAppointment),
  },
  {
    path: 'register/:state',
    loadComponent: () => import('./components/register/register').then((c) => c.Register),
  },

  ///////////////////////////////////////////////////////////

  {
    path: 'rank',
    loadComponent: () => import('./components/doc-rank/doc-rank').then((c) => c.DocRank),
  },
  {
    path: 'review',
    loadComponent: () =>
      import('./components/write-review/write-review').then((c) => c.WriteReview),
  },
];
