import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../common/footer/footer.component';
import { HeaderComponent } from '../common/header/header.component';
import { AuthService } from '../shared/services/auth.service';

@Component({
    selector: 'app-layout',
    standalone: true,
    template: `
        <app-header [isAuthenticated]="authService.isAuthenticated()" />
        <router-outlet />
        <app-footer />
    `,
    providers: [AuthService],
    imports: [RouterOutlet, HeaderComponent, FooterComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export default class LayoutComponent implements OnInit {
    authService = inject(AuthService);

    ngOnInit(): void {
        console.log('ChangeDetectionStrategy.OnPush');
    }
}
