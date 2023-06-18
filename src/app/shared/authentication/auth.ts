import { Injectable, signal } from '@angular/core';
import { User } from 'src/app/models/User';

Injectable();
export class AuthService {
    isAuthenticated = signal<boolean>(false);
    user = signal<User | null>(null);
}
