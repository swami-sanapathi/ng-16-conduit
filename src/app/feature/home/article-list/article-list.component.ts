import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Article } from '../../../models/Article';
import { ArticlePreviewComponent } from '../article-preview/article-preview.component';

@Component({
    standalone: true,
    selector: 'app-article-list',
    template: `
        <ng-container *ngIf="status !== 'loading'; else loading">
            <ng-container *ngIf="articles.length > 0; else noArticles">
                <app-article-preview *ngFor="let article of articles" [article]="article" />
            </ng-container>

            <ng-template #noArticles>
                <app-article-preview>No articles available.</app-article-preview>
            </ng-template>
        </ng-container>
        <ng-template #loading>
            <app-article-preview>Loading...</app-article-preview>
        </ng-template>
    `,
    imports: [NgIf, NgFor, ArticlePreviewComponent]
})
export class ArticleListComponent {
    @Input({ required: true }) articles!: Article[];
    @Input({ required: true }) status!: string;
}
