import { Injectable, inject } from '@angular/core';
import { SessionStorageService } from '../../shared/data-access/session-storage';
import { AuthService } from '../../shared/services/auth.service';

@Injectable()
export class SettingsService {
    #storage = inject(SessionStorageService);
    #authService = inject(AuthService);

    logout() {
        this.#storage.clear();
        this.#authService.navigateToHome();
    }
}
