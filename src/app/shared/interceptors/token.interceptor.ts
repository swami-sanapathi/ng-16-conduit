import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SessionStorageService } from '../data-access/session-storage';

export function provideToken(): HttpInterceptorFn {
    return (req, next) => {
        const token = inject(SessionStorageService).getItem('token');
        if (req && token) {
            req = req.clone({ setHeaders: { Authorization: `Token ${token}` } });
        }
        return next(req);
    };
}
