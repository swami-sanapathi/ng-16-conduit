import { Injectable, inject } from '@angular/core';
import { SessionStorageService } from '../../shared/data-access/session-storage';
import { AuthService } from '../../shared/services/auth.service';

@Injectable()
export class SettingsService {
    #storage = inject(SessionStorageService);
    #authService = inject(AuthService);

    logout() {
        this.#authService.authStatus.set('unauthenticated');
        this.#authService.user.set(null);
    }
}
