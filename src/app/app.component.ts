import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    template: ` <router-outlet></router-outlet> `,
    styles: [],
})
export class AppComponent {
    title = 'ng-16-conduit';
}
