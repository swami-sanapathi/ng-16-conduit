import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { User } from 'src/app/models/User';
import { SessionStorage } from 'src/app/shared/data-access/session-storage';
import { destroyNotifier } from 'src/app/shared/destroy/destroyNotifier';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ErrorService } from 'src/app/shared/services/errors.service';

@Injectable()
export class LoginService {
    readonly #http = inject(HttpClient);
    readonly errorService = inject(ErrorService);
    readonly #storage = inject(SessionStorage);
    readonly #authService = inject(AuthService);
    readonly #router = inject(Router);

    destory = destroyNotifier();

    login(user: User) {
        this.#http
            .post('/users/login', { user })
            .pipe(takeUntil(this.destory))
            .subscribe({
                next: (response: any) => {
                    console.log('response -->', response);
                    const { token, username } = response.user;
                    this.#storage.setItem('token', token);
                    this.#storage.setItem('username', username);
                    this.#storage.setItem('user', response.user);
                    this.#authService.user.set(response.user);
                    this.#authService.authStatus.set(true);
                    this.#router.navigate(['/']);
                },
                error: (error) => {
                    this.errorService.setErrors(error.errors);
                }
            });
    }
}
