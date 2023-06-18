import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../common/header/header.component';
import { FooterComponent } from '../common/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-layout',
    standalone: true,
    template: `
        <app-header />
        <router-outlet />
        <app-footer />
    `,
    styles: [],
    imports: [RouterOutlet, HeaderComponent, FooterComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LayoutComponent {}
