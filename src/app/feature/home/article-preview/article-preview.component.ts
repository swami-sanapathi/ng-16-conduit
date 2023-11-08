import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Article } from '../../../models/Article';

@Component({
    standalone: true,
    selector: 'app-article-preview',
    template: `
        <div class="article-preview">
            @if (article) {

                <div class="article-meta">
                    <a [routerLink]="['/profile', article.author.username]"><img [src]="article.author.image" /></a>
                    <div class="info">
                        <a class="author" [routerLink]="['/profile', article.author.username]">{{ article.author.username }}</a>
                        <span class="date">{{ article.updatedAt }}</span>
                    </div>
                    <button
                        class="btn btn-sm pull-xs-right"
                        [class.btn-primary]="article.favorited"
                        [class.btn-outline-primary]="!article.favorited"
                        (click)="onToggle.emit(article)"
                    >
                        <i class="ion-heart"></i>
                        {{ article.favoritesCount }}
                    </button>
                </div>
                <a class="preview-link" [routerLink]="['/article', article.slug]">
                    <h1>{{ article.title }}</h1>
                    <p>{{ article.description }}</p>
                    <span>Read more...</span>
                </a>
            
} @else {

                <ng-content></ng-content>
            
}
            
        </div>
    `,
    imports: [NgIf, RouterLink]
})
export class ArticlePreviewComponent {
    @Input() article!: Article;
    @Output() onToggle = new EventEmitter<Article>();
}
