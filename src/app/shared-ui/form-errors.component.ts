import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-form-error',
    standalone: true,
    template: `
        @if (errors?.length) {

            <ul class="error-messages">
                @for (error of errors; track error) {
  <li>{{ error }}</li>
}
            </ul>
        
}
    `,
    imports: [NgFor, NgIf]
})
export class FormErrors {
    @Input() errors!: string[];
}
