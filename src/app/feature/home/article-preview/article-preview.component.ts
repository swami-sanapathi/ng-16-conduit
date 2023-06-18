import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Article } from 'src/app/models/Article';

@Component({
    standalone: true,
    selector: 'app-article-preview',
    template: `
        <div class="article-preview">
            <ng-container *ngIf="article; else loading">
                <div class="article-meta">
                    <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg" /></a>
                    <div class="info">
                        <a href="" class="author">{{ article.author.username }}</a>
                        <span class="date">{{ article.updatedAt }}</span>
                    </div>
                    <button class="btn btn-outline-primary btn-sm pull-xs-right">
                        <i class="ion-heart"></i>
                        {{ article.favoritesCount }}
                    </button>
                </div>
                <a href="" class="preview-link">
                    <h1>{{ article.title }}</h1>
                    <p>{{ article.description }}</p>
                    <span>Read more...</span>
                </a>
            </ng-container>
            <ng-template #loading>
                <ng-content></ng-content>
            </ng-template>
        </div>
    `,
    imports: [NgIf]
})
export class ArticlePreviewComponent {
    @Input() article!: Article;
}
