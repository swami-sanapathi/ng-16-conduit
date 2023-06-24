import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanMatchFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from './auth.service';

export function authGuard(type: 'protected' | 'unprotected'): CanMatchFn {
    return () => {
        const auth = inject(AuthService);
        const router = inject(Router);
        // console.log(type, 'isAuthenticated -->', auth.isAuthenticated());
        return toObservable(auth.isAuthenticated).pipe(
            map((authStatus) => {
                console.log('authStatus', authStatus);

                if ((authStatus && type === 'protected') || (!authStatus && type === 'unprotected')) {
                    return true;
                }
                return router.parseUrl('/');
            })
        );

        // if ((auth.isAuthenticated() && type === 'protected') || (!auth.isAuthenticated() && type === 'unprotected')) {
        //     return true;
        // }
        // return router.parseUrl('/');
    };
}
