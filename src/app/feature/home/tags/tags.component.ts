import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-tags',
    template: `
        <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
                <ng-container *ngIf="status !== 'loading'; else loading">
                    <ng-container *ngIf="tags.length > 0; else noTags">
                        <a class="tag-pill tag-default" *ngFor="let tag of tags" (click)="selectedTag.emit(tag)">{{ tag }}</a>
                    </ng-container>
                    <ng-template #noTags>No tags available.</ng-template>
                </ng-container>
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
