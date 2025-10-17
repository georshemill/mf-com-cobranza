import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Material from '@primeng/themes/material';
import { getSingleSpaExtraProviders } from 'single-spa-angular';
import { APP_BASE_HREF } from '@angular/common';
import { definePreset } from '@primeng/themes';
import { MessageService } from 'primeng/api';

import { routes } from './app.routes';

const MyPreset = definePreset(Material, {
  // isDark: false,
  semantic: {
    primary: {
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}',
    },
  },
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: APP_BASE_HREF,
      useValue: '/',
    },
    MessageService,
    getSingleSpaExtraProviders(),
    providePrimeNG({
      ripple: true,
      inputStyle: 'filled',
      theme: { preset: MyPreset, options: { darkModeSelector: '.app-dark' } },
    }),
    provideAnimations(),
  ],
};
// , options: { darkModeSelector: '.app-dark' }
// {
//   providers: [
//     { provide: APP_BASE_HREF, useValue: '/' },
//     getSingleSpaExtraProviders(),
//     ...appConfig.providers!,
//   ],
// }
