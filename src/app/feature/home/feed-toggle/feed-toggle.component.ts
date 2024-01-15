import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-feed-toggle',
    standalone: true,
    template: `
        <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
                <li class="nav-item">
                    <a
                        class="nav-link"
                        [class.active]="changeFeed === 'FEED' && !selectTag"
                        [class.disabled]="isFeedDisabled"
                        (click)="!isFeedDisabled && selectFeed.emit()"
                    >
                        Your Feed
                    </a>
                </li>
                <li class="nav-item">
                    <a
                        class="nav-link"
                        [class.active]="changeFeed === 'GLOBAL' && !selectTag"
                        (click)="selectGlobal.emit()"
                    >
                        Global Feed
                    </a>
                </li>
                @if (selectTag) {
                    <li class="nav-item">
                        <a class="nav-link active" (click)="selectGlobal.emit()">#{{ selectTag }}</a>
                    </li>
                }
            </ul>
        </div>
    `,
    imports: [NgIf]
})
export class FeedToggleComponent {
    @Input({ required: true }) isFeedDisabled: boolean = true;
    @Input({ required: true }) changeFeed: FeedType = 'GLOBAL';
    @Input({ required: true }) selectTag!: string;

    @Output() selectFeed = new EventEmitter();
    @Output() selectGlobal = new EventEmitter();
}

export type FeedType = 'GLOBAL' | 'FEED' | 'TAG';
