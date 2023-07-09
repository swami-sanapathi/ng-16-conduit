import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Article } from 'src/app/models/Article';
import { NewArticle } from 'src/app/models/NewArticle';
import { destroyNotifier } from 'src/app/shared/destroy/destroyNotifier';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable()
export class CreateArticleService {
    readonly #http = inject(HttpClient);
    readonly #router = inject(Router);
    readonly #authService = inject(AuthService);
    destroy$ = destroyNotifier();

    publishArticle(article: NewArticle) {
        const user = this.#authService.user();
        return this.#http
            .post<{ article: Article }>('/articles', article)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (response) => {
                    console.log(response);
                    if (response) {
                        this.#router.navigate(['/articles', [response.article.slug]]);
                    } else {
                        this.#router.navigate(['/profile', { username: user?.username }]);
                    }
                },
                error: (err) => console.log(err)
            });
    }
}
