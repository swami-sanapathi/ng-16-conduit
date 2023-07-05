import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BannerComponent } from '../banner.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { FeedToggleComponent } from './feed-toggle/feed-toggle.component';
import { HomeService } from './home.service';
import { TagsServcie } from './tags/tag.service';
import { TagsComponent } from './tags/tags.component';

@Component({
    standalone: true,
    template: `
        <div class="home-page">
            <app-banner />

            <div class="container page">
                <div class="row">
                    <div class="col-md-9">
                        <app-feed-toggle
                            [isFeedDisabled]="!authService.isAuthenticated()"
                            [changeFeed]="homeService.feedType()"
                            [selectTag]="homeService.tag()"
                            (selectFeed)="homeService.getArticle('FEED')"
                            (selectGlobal)="homeService.getArticle('GLOBAL')"
                            
                        />
                        <app-article-list [articles]="homeService.articles()" [status]="homeService.status()" />
                    </div>

                    <div class="col-md-3">
                        <app-tags [tags]="tagsService.tags()" [status]="tagsService.status()" (selectedTag)="homeService.getArticle('TAG', $event)"/>
                    </div>
                </div>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [BannerComponent, ArticleListComponent, TagsComponent, FeedToggleComponent],
    providers: [HomeService, TagsServcie]
})
export default class HomeComponent implements OnInit {
    homeService = inject(HomeService);
    tagsService = inject(TagsServcie);
    authService = inject(AuthService);

    ngOnInit(): void {
        this.homeService.getArticle('GLOBAL');
        this.tagsService.getTags();
    }
}
