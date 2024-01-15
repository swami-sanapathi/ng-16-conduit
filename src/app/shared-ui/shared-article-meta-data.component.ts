import { DatePipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Article } from '../models/Article';

@Component({
    selector: 'app-shared-article-meta-data',
    standalone: true,
    template: `
        <div class="article-meta">
            <a [routerLink]="['/profile', article?.author?.username]"><img [src]="article?.author?.image" /></a>
            <div class="info">
                <a [routerLink]="['/profile', article?.author?.username]" class="author">
                    {{ article?.author?.username }}
                </a>
                <span class="date">{{ article?.createdAt | date: 'mediumDate' }}</span>
            </div>
            @if (isOwner) {
                <a class="btn btn-outline-secondary btn-sm" [routerLink]="['/new-article', article?.slug]">
                    <i class="ion-edit"></i>
                    Edit Article
                </a>
                <button style="margin-left: 0.5rem;" class="btn btn-outline-danger btn-sm" (click)="delete.emit()">
                    <i class="ion-trash-a"></i>
                    Delete Article
                </button>
            } @else {
                <button class="btn btn-sm btn-outline-secondary action-btn">
                    <i class="ion-plus-round"></i>
                    Follow {{ article?.author?.username }}
                </button>
            }

            &nbsp;&nbsp;
            <button class="btn btn-sm btn-outline-primary">
                <i class="ion-heart"></i>
                &nbsp; Favorite Post
                <span class="counter">({{ article?.favoritesCount }})</span>
            </button>
        </div>
    `,
    imports: [RouterLink, DatePipe, NgIf]
})
export class SharedArticleMetaDataComponent {
    @Input({ required: true }) article!: Article | null;
    @Input({ required: true }) isOwner: boolean = false;

    @Output() delete = new EventEmitter<void>();
    @Output() articleToggle = new EventEmitter<Article>();
}
