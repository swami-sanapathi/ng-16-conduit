import { InjectionToken, ValueProvider } from '@angular/core';

export interface ApiUrl {
    apiUrl: string;
}

export const API_URL_TOKEN = new InjectionToken<ApiUrl>('apiUrl');

export function provideApiConfig(url: ApiUrl): ValueProvider {
    return {
        provide: API_URL_TOKEN,
        useValue: url
    };
}
