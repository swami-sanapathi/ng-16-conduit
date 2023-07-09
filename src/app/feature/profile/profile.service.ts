import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { takeUntil } from 'rxjs';
import { User } from 'src/app/models/User';
import { ApiStatus } from 'src/app/shared/data-access-models/api-status';
import { destroyNotifier } from 'src/app/shared/destroy/destroyNotifier';

@Injectable()
export class ProfileService {
    readonly #http = inject(HttpClient);
    readonly destory$ = destroyNotifier();

    #profile = signal<User>({});
    #status = signal<ApiStatus>('loading');
    #isOwner = signal<boolean>(false);
    #username = signal<string>('');

    profile = this.#profile.asReadonly();
    status = this.#status.asReadonly();
    isOwner = this.#isOwner.asReadonly();
    username = this.#username.asReadonly();

    getProfile(username: string) {
        this.#status.set('loading');
        this.#http
            .get<{ profile: User }>(`/profiles/${username}`)
            .pipe(takeUntil(this.destory$))
            .subscribe({
                next: (response) => {
                    this.#status.set('success');
                    this.#profile.set(response.profile);
                    this.#isOwner.set(response.profile.username === username);
                    this.#username.set(response.profile.username || '');
                },
                error: (error) => {
                    this.#status.set('error');
                }
            });
    }
}
