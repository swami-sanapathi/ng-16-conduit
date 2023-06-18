import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideApiUrl } from './shared/interceptors/apiUrl';
import { provideApiConfig } from './shared/di/url';

export const appConfig: ApplicationConfig = {
    providers: [
        provideApiConfig({ apiUrl: 'https://api.realworld.io/api' }),
        provideRouter(routes, withHashLocation()),
        provideHttpClient(withInterceptors([provideApiUrl()]))
    ]
};
