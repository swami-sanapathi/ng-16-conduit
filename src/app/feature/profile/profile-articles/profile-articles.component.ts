import { Component, OnInit, inject } from '@angular/core';
import { ArticleToggleService } from 'src/app/shared/services/article-toggle.service';
import { ArticleListComponent } from '../../home/article-list/article-list.component';
import { ProfileArticlesService } from './profile-articles.service';

@Component({
    selector: 'app-profile-articles',
    standalone: true,
    template: `
        <app-article-list
            [articles]="profileArticlesService.articles()"
            [status]="profileArticlesService.status()"
            (articleToggle)="profileArticlesService.toggleArticle($event)"
        ></app-article-list>
    `,
    imports: [ArticleListComponent],
    providers: [ProfileArticlesService, ArticleToggleService]
})
export default class ProfileArticles implements OnInit {
    profileArticlesService = inject(ProfileArticlesService);

    ngOnInit(): void {
        this.profileArticlesService.getArticles();
    }
}
