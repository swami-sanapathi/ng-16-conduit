import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { takeUntil } from 'rxjs';
import { User } from '../../models/User';
import { SessionStorageService } from '../../shared/data-access/session-storage';
import { destroyNotifier } from '../../shared/destroy/destroyNotifier';
import { AuthService } from '../../shared/services/auth.service';
import { ErrorService } from '../../shared/services/errors.service';

@Injectable()
export class SignupService {
    readonly #http = inject(HttpClient);
    readonly #storage = inject(SessionStorageService);
    readonly authService = inject(AuthService);
    readonly #errorService = inject(ErrorService);

    readonly destory = destroyNotifier();

    signup(registedUser: User) {
        this.#http
            .post('/users', { user: registedUser })
            .pipe(takeUntil(this.destory))
            .subscribe({
                next: (response: any) => {
                    console.log('response -->', response);
                    const { token } = response.user;
                    this.#storage.setItem('token', token);
                    this.#storage.setItem('user', response.user);
                    this.authService.user.set(response.user);
                    this.authService.authStatus.set('authenticated');
                },
                error: ({ error }) => {
                    this.#errorService.setErrors(error.errors);
                }
            });
    }
}
