import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, Input as RouteInput, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { SharedProfileView } from '../../shared-ui/shared-profile-view.component';
import { ProfileArticleToggle } from './profile-article-toggle/profile-article-toggle.component';
import { ProfileService } from './profile.service';

@Component({
    standalone: true,
    template: `
        @if (profileService.status() !== 'loading') {

            <div class="profile-page">
                <app-shared-profile-view
                    [isOwner]="profileService.isOwner()"
                    [profile]="profileService.profile()"
                ></app-shared-profile-view>

                <div class="container">
                    <div class="row">
                        <div class="col-xs-12 col-md-10 offset-md-1">
                            <app-profile-article-toggle [username]="username"></app-profile-article-toggle>
                            <router-outlet />
                            <!-- route-outlet -->
                        </div>
                    </div>
                </div>
            </div>
        
} @else {
Loading...
}
        <ng-template #loading>Loading...</ng-template>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ProfileService],
    imports: [NgIf, RouterOutlet, SharedProfileView, ProfileArticleToggle]
})
export default class ProfileComponent implements OnInit {
    @RouteInput() username!: string;
    profileService = inject(ProfileService);
    titleService = inject(Title);

    ngOnInit(): void {
        this.profileService.getProfile(this.username);
        this.titleService.setTitle(`${this.username} Profile`);
    }
}
