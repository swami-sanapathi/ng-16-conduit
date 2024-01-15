import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_URL_TOKEN } from '../di/url';

export function provideApiUrl(): HttpInterceptorFn {
    return (req, next) => {
        if (!req.url.startsWith('http')) {
            const apiUrl = inject(API_URL_TOKEN).apiUrl;
            const cloneReq = req.clone({ url: `${apiUrl}${req.url}` });
            return next(cloneReq);
        }
        return next(req);
    };
}
