import { DestroyRef, inject } from '@angular/core';
import { Subject } from 'rxjs';

export function destroyNotifier() {
    const subject$ = new Subject<void>();
    inject(DestroyRef).onDestroy(() => {
        subject$.next();
        subject$.complete();
    });
    return subject$;
}
