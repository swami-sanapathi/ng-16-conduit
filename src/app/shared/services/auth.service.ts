import { Injectable, computed, signal } from '@angular/core';
import { User } from '../../models/User';
// import { SessionStorageService } from '../data-access/session-storage';

@Injectable()
export class AuthService {
    // storage = inject(SessionStorageService);

    authStatus = signal<boolean>(false);
    isAuthenticated = computed(() => {
        console.log('authStatus signal changed');
        return this.authStatus();
    });
    user = signal<User | null>(null);
}
