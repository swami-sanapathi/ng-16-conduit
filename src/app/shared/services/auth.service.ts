import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { SessionStorageService } from '../data-access/session-storage';

@Injectable({ providedIn: 'root' })
export class AuthService {
    storage = inject(SessionStorageService);
    #router = inject(Router);

    authStatus = signal<'authenticated' | 'unauthenticated'>('unauthenticated');
    isAuthenticated = computed(() => {
        if (this.authStatus() === 'authenticated') {
            return true;
        }

        this.refresh();
        return false;
    });
    user = signal<User | null>(null);

    refresh() {
        const token = this.storage.getItem('token');
        if (token) {
            this.storage.clear();
        }
        this.navigateToHome();
    }

    navigateToHome(urlSegments: string[] = ['/']) {
        void this.#router.navigate(urlSegments);
    }
}
