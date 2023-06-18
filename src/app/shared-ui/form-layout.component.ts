import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-form-layout',
    standalone: true,
    template: `
        <div class="container page">
            <div class="row">
                <div [class]="contentClass">
                    <ng-content></ng-content>
                </div>
            </div>
        </div>
    `
})
export class FormLayout {
    @Input({ required: true }) contentClass: string = '';
}
