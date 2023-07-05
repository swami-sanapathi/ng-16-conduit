import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { takeUntil } from 'rxjs';
import { ApiStatus } from 'src/app/shared/data-access-models/api-status';
import { destroyNotifier } from '../../../shared/destroy/destroyNotifier';

@Injectable()
export class TagsServcie {
    #tags = signal<string[]>([]);
    #status = signal<ApiStatus>('loading');

    tags = this.#tags.asReadonly();
    status = this.#status.asReadonly();

    #http = inject(HttpClient);
    destory = destroyNotifier();
    getTags() {
        this.#status.set('loading');

        this.#http
            .get<{ tags: string[] }>('/tags')
            .pipe(takeUntil(this.destory))
            .subscribe({
                next: ({ tags }) => {
                    this.#tags.set(tags);
                    this.#status.set('success');
                },
                error: () => {
                    this.#tags.set([]);
                    this.#status.set('error');
                }
            });
    }
}
