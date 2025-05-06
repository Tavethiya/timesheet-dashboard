import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { routes } from './app.routes';
import { CommonModule } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(FormsModule, CommonModule), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
