import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { SessionStorageService } from '../data-access/session-storage';

@Injectable({ providedIn: 'root' })
export class AuthService {
    storage = inject(SessionStorageService);
    #router = inject(Router);

    user = signal<User | null>(null);
    authStatus = signal<'authenticated' | 'unauthenticated'>('unauthenticated');
    readonly isAuthenticated = computed(() => this.authStatus() === 'authenticated' || false);

    async refresh() {
        const token = this.storage.getItem('token');
        if (!token) {
            this.authStatus.set('unauthenticated');
            this.user.set(null);
            return;
        }

        this.authStatus.set('authenticated');
        return;
    }

    navigateToHome(urlSegments: string[] = ['/']) {
        this.refresh().then(() => this.#router.navigate(urlSegments));
    }
}
