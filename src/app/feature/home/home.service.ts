import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { EMPTY, catchError, takeUntil } from 'rxjs';
import { ApiStatus } from 'src/app/shared/data-access-models/api-status';
import { Article } from '../../models/model';
import { destroyNotifier } from '../../shared/destroy/destroyNotifier';
import { FeedType } from './feed-toggle/feed-toggle.component';
@Injectable()
export class HomeService {
    #articles = signal<Article[]>([]);
    #status = signal<ApiStatus>('loading');
    #feedType = signal<FeedType>('GLOBAL');
    #http = inject(HttpClient);
    destroyRef = destroyNotifier();

    articles = this.#articles.asReadonly();
    feedType = this.#feedType.asReadonly();
    status = this.#status.asReadonly();

    getArticle(articleType: FeedType) {
        this.destroyRef.next();
        this.#status.set('loading');
        this.#feedType.set(articleType);
        articleType === 'GLOBAL' ? this.globalArticles() : this.favouriteFeed();
    }

    globalArticles() {
        this.#http
            .get<{ articles: Article[] }>('/articles')
            .pipe(
                takeUntil(this.destroyRef),
                catchError((error) => EMPTY)
            )
            .subscribe({
                next: ({ articles }: { articles: Article[] }) => {
                    this.#articles.set(articles);
                    this.#status.set('success');
                },
                error: () => {
                    this.#status.set('error');
                    this.#articles.set([]);
                }
            });
    }

    favouriteFeed() {
        this.#http
            .get<{ articles: Article[] }>('/articles/feed')
            .pipe(
                takeUntil(this.destroyRef),
                catchError((error) => EMPTY)
            )
            .subscribe({
                next: ({ articles }: { articles: Article[] }) => {
                    this.#articles.set(articles);
                    this.#status.set('success');
                },
                error: () => {
                    this.#status.set('error');
                    this.#articles.set([]);
                }
            });
    }
}
