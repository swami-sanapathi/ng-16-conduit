import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { takeUntil } from 'rxjs';
import { User } from '../../models/User';
import { SessionStorageService } from '../../shared/data-access/session-storage';
import { destroyNotifier } from '../../shared/destroy/destroyNotifier';
import { AuthService } from '../../shared/services/auth.service';
import { ErrorService } from '../../shared/services/errors.service';

@Injectable()
export class LoginService {
    readonly #http = inject(HttpClient);
    readonly errorService = inject(ErrorService);
    readonly #storage = inject(SessionStorageService);
    #authService = inject(AuthService);

    destory = destroyNotifier();

    login(user: User) {
        this.#http
            .post('/users/login', { user })
            .pipe(takeUntil(this.destory))
            .subscribe({
                next: (response: any) => {
                    const { token } = response.user;
                    this.#storage.setItem('token', token);
                    this.#storage.setItem('user', response.user);
                    this.#authService.navigateToHome();
                },
                error: (error) => {
                    this.errorService.setErrors(error.errors);
                }
            });
    }
}
