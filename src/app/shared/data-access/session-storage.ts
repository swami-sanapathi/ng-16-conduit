import { Injectable, inject } from '@angular/core';
import { SESSION_STORAGE } from '../di/storage';

Injectable({ providedIn: 'root' });
export class SessionStorage {
    ss = inject(SESSION_STORAGE);

    getItem(key: string) {
        if (!this.ss) {
            return null;
        }

        let value = this.ss.getItem(key);
        if (!value) {
            return null;
        }

        try {
            value = JSON.parse(value);
            if (typeof value === 'object') {
                return value;
            }
            return value;
        } catch (error) {
            return value;
        }
    }

    setItem(key: string, value: string) {
        if (!this.ss) {
            return;
        }

        if (typeof value === 'object') {
            this.ss.setItem(key, JSON.stringify(value));
        } else {
            this.ss.setItem(key, value);
        }
    }

    clear() {
        this.ss?.clear();
    }
}
