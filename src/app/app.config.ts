import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
    provideHttpClient(withFetch()),

    // provideToastr({
    //   timeOut: 3000, // الوقت بالـ ms (كدا 3 ثواني)
    //   positionClass: 'toast-top-right', // المكان (ممكن تغيره لـ toast-bottom-center مثلاً)
    //   preventDuplicates: true, // عشان ميكررش نفس الرسالة لو اليوزر داس كتير
    //   progressBar: true, // شريط وقت بيخلص قدام اليوزر (شيك جداً)
    //   closeButton: true, // زرار قفل
    // }),
    provideToastr(),
  ],
};
