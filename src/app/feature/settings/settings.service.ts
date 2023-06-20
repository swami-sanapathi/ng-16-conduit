import { Injectable, inject } from '@angular/core';
import { SessionStorageService } from 'src/app/shared/data-access/session-storage';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable()
export class SettingsService {
    #storage = inject(SessionStorageService);
    #authService = inject(AuthService);

    logout() {
        this.#authService.authStatus.set(false);
        this.#authService.user.set(null);
        this.#storage.clear();
    }
}
