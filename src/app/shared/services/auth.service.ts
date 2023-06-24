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
    readonly isAuthenticated = computed(() => {
        console.log('authStatus --> original', this.authStatus(), this.authStatus() === 'authenticated');

        return this.authStatus() === 'authenticated' || false;
    });

    async refresh() {
        const token = this.storage.getItem('token');
        if (!token) {
            this.authStatus.set('unauthenticated');
            this.user.set(null);
            return;
        }

        this.authStatus.set('authenticated');
        console.log('refresh 1-->', this.isAuthenticated());
        return;
    }

    navigateToHome(urlSegments: string[] = ['/']) {
        this.refresh().then(() => {
            console.log('refresh 2-->', this.isAuthenticated());

            this.#router.navigate(urlSegments);
        });

        console.log('refresh 3-->', this.isAuthenticated());
    }
}
