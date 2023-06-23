import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { EMPTY, catchError, takeUntil } from 'rxjs';
import { Article } from '../../models/model';
import { destroyNotifier } from '../../shared/destroy/destroyNotifier';

@Injectable()
export class HomeService {
    #articles = signal<Article[]>([]);
    articles = this.#articles.asReadonly();

    #http = inject(HttpClient);
    destroyRef = destroyNotifier();

    getArticle() {
        this.destroyRef.next();
        this.#http
            .get('/articles')
            .pipe(
                takeUntil(this.destroyRef),
                catchError((error) => EMPTY)
            )
            .subscribe((response: any) => {
                console.log('data -->', response);
                this.#articles.set(response.articles);
            });
    }
}
