import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-tags',
    template: `
        <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
                <ng-container *ngIf="tags.length > 0; else loading">
                    <a class="tag-pill tag-default" *ngFor="let tag of tags">{{ tag }}</a>
                </ng-container>
                <ng-template #loading>Loading...</ng-template>
            </div>
        </div>
    `,
    imports: [NgIf, NgFor]
})
export class TagsComponent {
    @Input() tags!: string[];
}
