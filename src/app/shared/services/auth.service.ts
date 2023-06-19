import { Injectable, computed, inject, signal } from '@angular/core';
import { User } from 'src/app/models/User';
import { SessionStorage } from '../data-access/session-storage';

Injectable();
export class AuthService {
    storage = inject(SessionStorage);

    authStatus = signal<boolean>(false);
    isAuthenticated = computed(() => {
        console.log(this.authStatus());
        console.log(this.storage.getItem('token'));

        return (
            this.authStatus() ||
            !['undefined', 'null', null, undefined].includes(this.storage.getItem('token')) ||
            false
        );
    });
    user = signal<User | null>(null);
}
