import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SessionStorageService } from 'src/app/shared/data-access/session-storage';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SettingsService } from './settings.service';

@Component({
    standalone: true,
    template: `
        <div class="settings-page">
            <div class="container page">
                <div class="row">
                    <div class="col-md-6 offset-md-3 col-xs-12">
                        <h1 class="text-xs-center">Your Settings</h1>

                        <form
                            [formGroup]="settingsForm"
                            (ngSubmit)="settingsService.updateCurrentUser(settingsForm.getRawValue())"
                        >
                            <fieldset>
                                <fieldset class="form-group">
                                    <input
                                        class="form-control"
                                        type="text"
                                        placeholder="URL of profile picture"
                                        formControlName="image"
                                    />
                                </fieldset>
                                <fieldset class="form-group">
                                    <input
                                        class="form-control form-control-lg"
                                        type="text"
                                        placeholder="Your Name"
                                        formControlName="username"
                                    />
                                </fieldset>
                                <fieldset class="form-group">
                                    <textarea
                                        class="form-control form-control-lg"
                                        rows="8"
                                        placeholder="Short bio about you"
                                        formControlName="bio"
                                    ></textarea>
                                </fieldset>
                                <fieldset class="form-group">
                                    <input
                                        class="form-control form-control-lg"
                                        type="text"
                                        placeholder="Email"
                                        formControlName="email"
                                    />
                                </fieldset>
                                <fieldset class="form-group">
                                    <input
                                        class="form-control form-control-lg"
                                        type="password"
                                        placeholder="Password"
                                        formControlName="password"
                                    />
                                </fieldset>
                                <button class="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
                            </fieldset>
                        </form>
                        <hr />
                        <button class="btn btn-outline-danger" (click)="settingsService.logout()">
                            Or click here to logout.
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SettingsService],
    imports: [ReactiveFormsModule]
})
export default class SettingsComponent {
    readonly settingsService = inject(SettingsService);
    readonly #storage = inject(SessionStorageService);
    readonly #authService = inject(AuthService);

    settingsForm = inject(FormBuilder).nonNullable.group({
        image: ['', [Validators.required]],
        username: ['', [Validators.required]],
        bio: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]]
    });

    constructor() {
        effect(() => {
            const user = (this.#authService.user() ?? this.#storage.getItem('user')) as any;
            if (user) {
                this.settingsForm.patchValue(user);
            }
        });
    }
}
