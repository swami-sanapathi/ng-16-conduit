import { DOCUMENT } from '@angular/common';
import { InjectionToken, inject } from '@angular/core';

export const SESSION_STORAGE = new InjectionToken<Storage | null>('session storage', {
    factory: () => {
        const document = inject(DOCUMENT, { optional: true });
        if (document?.defaultView) {
            return document.defaultView.sessionStorage;
        }

        return null;
    }
});
