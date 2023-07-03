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
                        [class.active]="changeFeed === 'FEED'"
                        [class.disabled]="isFeedDisabled"
                        (click)="!isFeedDisabled && selectFeed.emit()"
                    >
                        Your Feed
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" [class.active]="changeFeed === 'GLOBAL'" (click)="selectGlobal.emit()">
                        Global Feed
                    </a>
                </li>
            </ul>
        </div>
    `
})
export class FeedToggleComponent {
    @Input() isFeedDisabled: boolean = true;
    @Input() changeFeed: FeedType = 'GLOBAL';

    @Output() selectFeed = new EventEmitter();
    @Output() selectGlobal = new EventEmitter();
}

export type FeedType = 'GLOBAL' | 'FEED';
