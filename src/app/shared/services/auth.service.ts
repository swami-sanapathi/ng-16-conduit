import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { User } from '../../models/User';
import { SessionStorageService } from '../data-access/session-storage';

@Injectable({ providedIn: 'root' })
export class AuthService {
    storage = inject(SessionStorageService);
    #router = inject(Router);
    #http = inject(HttpClient);

    user = signal<User | null>(null);
    isAuthenticated = signal<boolean>(false);

    async refresh() {
        const token = this.storage.getItem('token');
        if (!token) {
            this.isAuthenticated.set(false);
            this.user.set(null);
            return;
        }

        this.#http.get('/user').subscribe({
            next: (res: any) => {
                this.storage.setItem('user', JSON.stringify(res.user));
                this.user.set(res.user);
            },
            error: (err) => EMPTY
        });

        this.isAuthenticated.set(true);
        return;
    }

    navigateToHome(urlSegments: string[] = ['/']) {
        this.refresh().then(() => this.#router.navigate(urlSegments));
    }
}
