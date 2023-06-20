import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { ErrorService } from 'src/app/shared/services/errors.service';
import { User } from '../../models/User';
import { AuthService } from '../../shared/services/auth.service';
import { SessionStorageService } from '../../shared/data-access/session-storage';
import { destroyNotifier } from '../../shared/destroy/destroyNotifier';

@Injectable()
export class SignupService {
    readonly #http = inject(HttpClient);
    readonly #storage = inject(SessionStorageService);
    readonly authService = inject(AuthService);
    readonly #errorService = inject(ErrorService);
    readonly #router = inject(Router);

    readonly destory = destroyNotifier();

    signup(registedUser: User) {
        this.#http
            .post('/users', { user: registedUser })
            .pipe(takeUntil(this.destory))
            .subscribe({
                next: (response: any) => {
                    console.log('response -->', response);
                    const { user, token, username } = response.user;
                    this.#storage.setItem('token', token);
                    this.#storage.setItem('username', username);
                    this.#storage.setItem('user', response.user);
                    this.authService.user.set(response.user);
                    this.authService.authStatus.set(true);
                    this.#router.navigate(['/']);
                },
                error: ({ error }) => {
                    this.#errorService.setErrors(error.errors);
                }
            });
    }
}
