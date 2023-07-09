import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntil } from 'rxjs';
import { Article } from 'src/app/models/Article';
import { ApiStatus } from 'src/app/shared/data-access-models/api-status';
import { destroyNotifier } from 'src/app/shared/destroy/destroyNotifier';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable()
export class ArticleService {
    #http = inject(HttpClient);
    #authService = inject(AuthService);
    destory$ = destroyNotifier();

    #article = signal<Article | null>(null);
    #status = signal<ApiStatus>('loading');

    article = this.#article.asReadonly();
    status = this.#status.asReadonly();
    isOwner = computed(() => {
        const username = this.#authService.user()?.username;
        const articleUser = this.#article()?.author.username;
        return !!this.#article() && !!username && username === articleUser;
    });

    getArticleInfo(slug: string) {
        this.#status.set('loading');
        this.#http
            .get<{ article: Article }>(`/articles/${slug}`)
            .pipe(takeUntil(this.destory$))
            .subscribe({
                next: (response) => {
                    this.#status.set('success');
                    this.#article.set(response.article);
                },
                error: () => {
                    this.#article.set(null);
                    this.#status.set('error');
                }
            });
    }
}
