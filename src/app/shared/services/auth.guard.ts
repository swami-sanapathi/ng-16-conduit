import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanMatchFn, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { AuthService } from './auth.service';

export function authGuard(type: 'protected' | 'unprotected'): CanMatchFn {
    return () => {
        const authService = inject(AuthService);
        const router = inject(Router);
        return toObservable(authService.isAuthenticated).pipe(
            filter(() => !authService.isAuthenticating()),
            map((isAuthenticated) => {
                if ((type === 'unprotected' && !isAuthenticated) || (type === 'protected' && isAuthenticated))
                    return true;
                return router.parseUrl('/');
            })
        );
    };
}
