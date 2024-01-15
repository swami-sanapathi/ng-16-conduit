import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-tags',
    template: `
        <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
                @if (status !== 'loading') {
                    @if (tags.length > 0) {
                        @for (tag of tags; track tag) {
                            <a class="tag-pill tag-default" (click)="selectedTag.emit(tag)">{{ tag }}</a>
                        }
                    } @else {
                        No tags available.
                    }
                } @else {
                    Loading...
                }
                <ng-template #loading>Loading...</ng-template>
            </div>
        </div>
    `,
    imports: [NgIf, NgFor]
})
export class TagsComponent {
    @Input() tags!: string[];
    @Input() status!: string;

    @Output() selectedTag = new EventEmitter<string>();
}
