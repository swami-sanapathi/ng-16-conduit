import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-form-error',
    standalone: true,
    template: `
        <ng-container *ngIf="errors?.length">
            <ul class="error-messages">
                <li *ngFor="let error of errors">{{ error }}</li>
            </ul>
        </ng-container>
    `,
    imports: [NgFor, NgIf]
})
export class FormErrors {
    @Input() errors!: string[];
}
