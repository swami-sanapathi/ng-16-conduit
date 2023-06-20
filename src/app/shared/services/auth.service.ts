import { Injectable, computed, inject, signal } from '@angular/core';
import { User } from 'src/app/models/User';
import { SessionStorageService } from '../data-access/session-storage';

Injectable();
export class AuthService {
    storage = inject(SessionStorageService);

    authStatus = signal<boolean>(false);
    readonly isAuthenticated = computed(() => this.authStatus());
    user = signal<User | null>(null);
}
