import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { takeUntil } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/shared/authentication/auth';
import { SessionStorage } from 'src/app/shared/data-access/session-storage';
import { destroyNotifier } from 'src/app/shared/destroy/destroyNotifier';

@Injectable()
export class Signup {
    readonly #http = inject(HttpClient);
    readonly authService = inject(AuthService);
    readonly #storage = inject(SessionStorage);

    readonly destory = destroyNotifier();
    readonly #errors = signal<string[]>([]);
    errors = this.#errors.asReadonly();

    signup(registedUser: User) {
        this.#http
            .post('/users', { user: registedUser })
            .pipe(takeUntil(this.destory))
            .subscribe({
                next: (response: any) => {
                    console.log('response -->', response);
                    const { user, token, username } = response.user;
                    this.authService.isAuthenticated.set(true);
                    this.#storage.setItem('token', token);
                    this.#storage.setItem('user', user);
                    this.#storage.setItem('username', username);
                    // {
                    //     "user": {
                    //       "email": "string",
                    //       "token": "string",
                    //       "username": "string",
                    //       "bio": "string",
                    //       "image": "string"
                    //     }
                    //   }
                    this.authService.user.set(response.user as User);
                },
                error: ({ error }) => {
                    this.#errors.set(processErrors(error.errors));
                }
            });
    }
}

export function processErrors(errors: Record<string, string[]>) {
    const errorEntries = Object.entries(errors);
    return errorEntries.reduce((errArr, curr) => {
        errArr.push(...curr[1].map((m: string) => `${curr[0]} ${m}`));
        return errArr;
    }, [] as string[]);
}
