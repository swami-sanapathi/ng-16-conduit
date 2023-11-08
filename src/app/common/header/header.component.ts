import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { User } from 'src/app/models/User';

@Component({
    selector: 'app-header',
    standalone: true,
    template: `
        <nav class="navbar navbar-light">
            <div class="container">
                <a class="navbar-brand" routerLink="/">conduit</a>
                <ul class="nav navbar-nav pull-xs-right">
                    <li class="nav-item">
                        <!-- Add "active" class when you're on that page" -->
                        <a
                            class="nav-link"
                            routerLink="/"
                            routerLinkActive="active"
                            [routerLinkActiveOptions]="{ exact: true }"
                        >
                            Home
                        </a>
                    </li>
                    @if (isAuthenticated) {

                        <li class="nav-item">
                            <a
                                class="nav-link"
                                routerLink="/new-article"
                                routerLinkActive="active"
                                [routerLinkActiveOptions]="{ exact: true }"
                            >
                                <i class="ion-compose"></i>
                                &nbsp;New Article
                            </a>
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                routerLink="/settings"
                                routerLinkActive="active"
                                [routerLinkActiveOptions]="{ exact: true }"
                            >
                                <i class="ion-gear-a"></i>
                                &nbsp;Settings
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" [routerLink]="['/profile', user?.username]">
                                <img [src]="user?.image" class="user-pic" />
                                {{ user?.username }}
                            </a>
                        </li>
                    
} @else {

                        <li class="nav-item">
                            <a
                                class="nav-link"
                                routerLink="/login"
                                routerLinkActive="active"
                                [routerLinkActiveOptions]="{ exact: true }"
                            >
                                Sign in
                            </a>
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                routerLink="/signup"
                                routerLinkActive="active"
                                [routerLinkActiveOptions]="{ exact: true }"
                            >
                                Sign up
                            </a>
                        </li>
                    
}
                    
                </ul>
            </div>
        </nav>
    `,
    imports: [RouterLink, RouterLinkActive, NgIf]
})
export class HeaderComponent {
    @Input({ required: true }) isAuthenticated = false;
    @Input({ required: true }) user!: User | null;
}
