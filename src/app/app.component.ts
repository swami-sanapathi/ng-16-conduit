import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet],
    template: `
        <router-outlet />
    `
})
export class AppComponent implements OnInit {
    title = 'ng-16-conduit';
    readonly #authService = inject(AuthService);

    ngOnInit() {
        this.#authService.refresh();
    }
}
