import { InjectionToken, inject } from '@angular/core';

export const SESSION_STORAGE = new InjectionToken('session storage', {
    factory: () => {
        const document = inject(Document, { optional: true });
        if (document?.defaultView) {
            return document.defaultView.sessionStorage;
        }

        return null;
    }
});
