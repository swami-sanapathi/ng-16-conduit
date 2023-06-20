import { Component } from '@angular/core';

@Component({
    selector: 'app-banner',
    standalone: true,
    template: `
        <div class="banner">
            <div class="container">
                <h1 class="logo-font">conduit</h1>
                <p>A place to share your knowledge.</p>
            </div>
        </div>
    `
})
export class BannerComponent {}
