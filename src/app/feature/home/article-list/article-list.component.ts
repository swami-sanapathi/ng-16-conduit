import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Article } from '../../../models/Article';
import { ArticlePreviewComponent } from '../article-preview/article-preview.component';

@Component({
    standalone: true,
    selector: 'app-article-list',
    template: `
        @if (status !== 'loading') {

            @if (articles.length > 0) {

                @for (article of articles; track article) {
  <app-article-preview
                   
                    [article]="article"
                    (onToggle)="onToggle.emit($event)"
                />
}
            
} @else {

                <app-article-preview>No articles available.</app-article-preview>
            
}

            
        
} @else {

            <app-article-preview>Loading...</app-article-preview>
        
}
        <ng-template #loading>
            <app-article-preview>Loading...</app-article-preview>
        </ng-template>
    `,
    imports: [NgIf, NgFor, ArticlePreviewComponent]
})
export class ArticleListComponent {
    @Input({ required: true }) articles!: Article[];
    @Input({ required: true }) status!: string;

    @Output('articleToggle') onToggle = new EventEmitter<Article>();
}
