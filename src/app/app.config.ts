import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { SessionStorage } from './shared/data-access/session-storage';
import { provideApiConfig } from './shared/di/url';
import { provideApiUrl } from './shared/interceptors/apiUrl';

export const appConfig: ApplicationConfig = {
    providers: [
        SessionStorage,
        provideApiConfig({ apiUrl: 'https://api.realworld.io/api' }),
        provideRouter(routes, withHashLocation()),
        provideHttpClient(withInterceptors([provideApiUrl()]))
    ]
};
