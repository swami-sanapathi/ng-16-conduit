import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input as RouteInput, inject } from '@angular/core';
import { SharedArticleMetaDataComponent } from '../../shared-ui/shared-article-meta-data.component';
import { BannerComponent } from '../banner.component';
import { ArticleService } from './article.service';

@Component({
    standalone: true,
    template: `
        <ng-container *ngIf="articleService.status() !== 'loading'; else loading">
            <ng-container *ngIf="articleService.article() as article">
                <div class="article-page">
                    <div class="banner">
                        <div class="container">
                            <h1>{{ article?.title }}</h1>
                            <app-shared-article-meta-data [article]="article" [isOwner]="articleService.isOwner()" />
                        </div>
                    </div>

                    <div class="container page">
                        <div class="row article-content">
                            <div class="col-md-12">
                                <div class="body" [innerHTML]="article?.body"></div>
                                <ul *ngIf="article.tagList.length > 0" class="tag-list">
                                    <li
                                        class="tag-default tag-pill tag-outline ng-binding ng-scope"
                                        *ngFor="let tag of article.tagList"
                                    >
                                        {{ tag }}
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <hr />

                        <div class="article-actions">
                            <app-shared-article-meta-data [article]="article" [isOwner]="articleService.isOwner()" />
                        </div>

                        <div class="row">
                            <div class="col-xs-12 col-md-8 offset-md-2">
                                <form class="card comment-form">
                                    <div class="card-block">
                                        <textarea
                                            class="form-control"
                                            placeholder="Write a comment..."
                                            rows="3"
                                        ></textarea>
                                    </div>
                                    <div class="card-footer">
                                        <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
                                        <button class="btn btn-sm btn-primary">Post Comment</button>
                                    </div>
                                </form>

                                <div class="card">
                                    <div class="card-block">
                                        <p class="card-text">
                                            With supporting text below as a natural lead-in to additional content.
                                        </p>
                                    </div>
                                    <div class="card-footer">
                                        <a href="" class="comment-author">
                                            <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
                                        </a>
                                        &nbsp;
                                        <a href="" class="comment-author">Jacob Schmidt</a>
                                        <span class="date-posted">Dec 29th</span>
                                    </div>
                                </div>

                                <div class="card">
                                    <div class="card-block">
                                        <p class="card-text">
                                            With supporting text below as a natural lead-in to additional content.
                                        </p>
                                    </div>
                                    <div class="card-footer">
                                        <a href="" class="comment-author">
                                            <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
                                        </a>
                                        &nbsp;
                                        <a href="" class="comment-author">Jacob Schmidt</a>
                                        <span class="date-posted">Dec 29th</span>
                                        <span class="mod-options">
                                            <i class="ion-edit"></i>
                                            <i class="ion-trash-a"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ng-container>
        </ng-container>
        <ng-template #loading>
            <p>Article loading..</p>
        </ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ArticleService],
    imports: [BannerComponent, SharedArticleMetaDataComponent, NgIf, NgFor]
})
export default class ArticleComponent {
    articleService = inject(ArticleService);
    @RouteInput({ required: true }) set slug(slug: string) {
        this.articleService.getArticleInfo(slug);
    }
}
