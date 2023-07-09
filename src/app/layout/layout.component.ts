import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../common/footer/footer.component';
import { HeaderComponent } from '../common/header/header.component';
import { AuthService } from '../shared/services/auth.service';

@Component({
    standalone: true,
    template: `
        <app-header [isAuthenticated]="authService.isAuthenticated()" [user]="authService.user()" />
        <router-outlet />
        <app-footer />
    `,
    imports: [RouterOutlet, HeaderComponent, FooterComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LayoutComponent {
    authService = inject(AuthService);
}
