import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-feed-toggle',
    template: `
        <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
                <li class="nav-item">
                    <a class="nav-link disabled">Your Feed</a>
                </li>
                <li class="nav-item" (click)="changeFeed.emit('GLOBAL')">
                    <a class="nav-link active">Global Feed</a>
                </li>
            </ul>
        </div>
    `
})
export class FeedToggleComponent {
    @Output() changeFeed = new EventEmitter();
}
