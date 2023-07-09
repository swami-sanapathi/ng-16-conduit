import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { takeUntil } from 'rxjs';
import { Article } from 'src/app/models/Article';
import { ApiStatus } from 'src/app/shared/data-access-models/api-status';
import { destroyNotifier } from 'src/app/shared/destroy/destroyNotifier';
import { ArticleToggleService } from 'src/app/shared/services/article-toggle.service';
import { ProfileService } from '../profile.service';
import { PROFILE_ARTICLES } from './profile-articles.di';

@Injectable()
export class ProfileArticlesService {
    #type = inject(PROFILE_ARTICLES);
    #profileService = inject(ProfileService);
    #toggleService = inject(ArticleToggleService);
    #http = inject(HttpClient);
    destory$ = destroyNotifier();

    #articles = signal<Article[]>([]);
    #status = signal<ApiStatus>('loading');

    articles = this.#articles.asReadonly();
    status = this.#status.asReadonly();

    getArticles() {
        this.#status.set('loading');
        const params =
            this.#type === 'my'
                ? new HttpParams().set('author', this.#profileService.username())
                : new HttpParams().set('favorited', this.#profileService.username());
        this.#http
            .get<{ articles: Article[] }>(`/articles`, { params: params })
            .pipe(takeUntil(this.destory$))
            .subscribe({
                next: (response) => {
                    this.#status.set('success');
                    this.#articles.set(response.articles);
                },
                error: () => {
                    this.#articles.set([]);
                    this.#status.set('error');
                }
            });
    }

    async toggleArticle(article: Article) {
        console.log(article, 'article -->');

        const response: Article = article.favorited
            ? await this.#toggleService.unFavArticle(article)
            : await this.#toggleService.favArticle(article);
        console.log('response -->', article.favorited, response);

        this.#articles.update((articles) =>
            articles.map((article) => {
                if (article.slug === response.slug) return response;
                return article;
            })
        );
        console.log(this.#articles());
    }
}
