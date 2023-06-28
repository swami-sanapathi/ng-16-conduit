import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export function authGuard(type: 'protected' | 'unprotected'): CanMatchFn {
    return () => {
        const auth = inject(AuthService);
        const router = inject(Router);

        if ((auth.isAuthenticated() && type === 'protected') || (!auth.isAuthenticated() && type === 'unprotected')) {
            return true;
        }
        return router.parseUrl('/');
    };
}
