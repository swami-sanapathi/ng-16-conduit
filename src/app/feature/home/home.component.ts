import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { BannerComponent } from '../banner.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { FeedToggleComponent } from './feed-toggle/feed-toggle.component';
import { HomeService } from './home.service';
import { TagsComponent } from './tags/tags.component';
import { TagsServcie } from './tags/tas.service';

@Component({
    standalone: true,
    template: `
        <div class="home-page">
            <app-banner />

            <div class="container page">
                <div class="row">
                    <div class="col-md-9">
                        <app-feed-toggle (changeFeed)="homeService.getArticle()" />
                        <app-article-list [articles]="homeService.articles()" />
                    </div>

                    <div class="col-md-3">
                        <app-tags [tags]="tagsService.tags()" />
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

    ngOnInit(): void {
        this.homeService.getArticle();
        this.tagsService.getTags();
    }
}
