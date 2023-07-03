import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { EMPTY } from 'rxjs';
import { User } from 'src/app/models/User';
import { SessionStorageService } from '../../shared/data-access/session-storage';
import { AuthService } from '../../shared/services/auth.service';

@Injectable()
export class SettingsService {
    #storage = inject(SessionStorageService);
    #authService = inject(AuthService);
    #http = inject(HttpClient);

    logout() {
        this.#storage.clear();
        this.#authService.navigateToHome();
    }

    updateCurrentUser(updatedUser: User): void {
        this.#http.put<{ user: User }>('/user', { user: updatedUser }).subscribe({
            next: ({ user }: { user: User }) => {
                this.#storage.setItem('user', JSON.stringify(user));
                this.#storage.setItem('token', JSON.stringify(user.token));
            },
            error: () => EMPTY
        });
    }
}
