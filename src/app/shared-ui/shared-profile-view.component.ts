import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../models/User';

@Component({
    selector: 'app-shared-profile-view',
    standalone: true,
    template: `
        <div class="user-info">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-md-10 offset-md-1">
                        <img src="{{ profile.image }}" class="user-img" />
                        <h4>{{ profile.username }}</h4>
                        <p>
                            {{ profile.bio }}
                        </p>
                        @if (isOwner) {

                            <button class="btn btn-sm btn-outline-secondary action-btn" routerLink="/settings">
                                <i class="ion-gear-a"></i>
                                Edit Profile Settings
                            </button>
                        
} @else {

                            <button class="btn btn-sm btn-outline-secondary action-btn">
                                <i class="ion-plus-round"></i>
                                &nbsp; Follow {{ profile.username }}
                            </button>
                        
}
                        
                    </div>
                </div>
            </div>
        </div>
    `,
    imports: [NgIf, RouterLink]
})
export class SharedProfileView {
    @Input({ required: true }) profile!: User;
    @Input({ required: true }) isOwner: boolean = false;
}
