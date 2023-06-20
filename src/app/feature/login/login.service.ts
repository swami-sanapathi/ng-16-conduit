import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { User } from 'src/app/models/User';
import { SessionStorageService } from 'src/app/shared/data-access/session-storage';
import { destroyNotifier } from 'src/app/shared/destroy/destroyNotifier';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ErrorService } from 'src/app/shared/services/errors.service';

@Injectable()
export class LoginService {
    readonly #http = inject(HttpClient);
    readonly errorService = inject(ErrorService);
    readonly #storage = inject(SessionStorageService);
    readonly #authService = inject(AuthService);
    readonly #router = inject(Router);
    readonly #cdr = inject(ChangeDetectorRef);

    destory = destroyNotifier();

    login(user: User) {
        this.#http
            .post('/users/login', { user })
            .pipe(takeUntil(this.destory))
            .subscribe({
                next: (response: any) => {
                    console.log('response -->', response);
                    const { token, username } = response.user;
                    console.log('before set .isAuthenticated', this.#authService.isAuthenticated());
                    this.#authService.user.set(response.user);
                    this.#authService.authStatus.set(true);
                    console.log('after set .isAuthenticated', this.#authService.isAuthenticated());
                    this.#storage.setItem('token', token);
                    this.#storage.setItem('username', username);
                    this.#storage.setItem('user', response.user);
                    // this.#router.navigate(['/']);
                    // this.#cdr.markForCheck();
                    this.authenticate();
                },
                error: (error) => {
                    this.errorService.setErrors(error.errors);
                }
            });
    }

    authenticate(urlSegments: string[] = ['/']) {
        // this.refresh();
        void this.#router.navigate(urlSegments);
    }
}
