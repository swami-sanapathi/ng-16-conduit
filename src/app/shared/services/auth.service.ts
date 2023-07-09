import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { User } from '../../models/User';
import { SessionStorageService } from '../data-access/session-storage';

@Injectable({ providedIn: 'root' })
export class AuthService {
    storage = inject(SessionStorageService);
    #router = inject(Router);
    #http = inject(HttpClient);

    user = signal<User | null>(null);
    isAuthenticated = signal<boolean>(false);
    #status = signal<'idle' | 'authenticated' | 'unauthenticated'>('idle');
    isAuthenticating = computed(() => this.#status() === 'idle');

    async refresh() {
        const token = this.storage.getItem('token');
        if (!token) {
            this.isAuthenticated.set(false);
            this.user.set(null);
            this.#status.set('unauthenticated');
            return;
        }

        const response: { user: User } = await firstValueFrom(this.#http.get<{ user: User }>('/user'));
        this.storage.setItem('user', JSON.stringify(response.user));
        this.user.set(response.user);
        this.isAuthenticated.set(true);
        this.#status.set('authenticated');
        return;
    }

    navigateToHome(urlSegments: string[] = ['/']) {
        this.refresh().then(() => this.#router.navigate(urlSegments));
    }
}
