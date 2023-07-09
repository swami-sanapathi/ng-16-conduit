import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom, takeUntil } from 'rxjs';
import { Article } from 'src/app/models/Article';
import { destroyNotifier } from '../destroy/destroyNotifier';

@Injectable()
export class ArticleToggleService {
    #http = inject(HttpClient);
    destory$ = destroyNotifier();

    async favArticle(article: Article): Promise<Article> {
        return firstValueFrom(
            this.#http
                .post<{ article: Article }>(`/articles/${article.slug}/favorite`, { params: { slug: article.slug } })
                .pipe(takeUntil(this.destory$))
        ).then((response) => response.article);
    }

    async unFavArticle(article: Article): Promise<Article> {
        return firstValueFrom(
            this.#http
                .delete<{ article: Article }>(`/articles/${article.slug}/favorite`, { params: { slug: article.slug } })
                .pipe(takeUntil(this.destory$))
        ).then((response) => response.article);
    }
}
