import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SessionStorageService } from 'src/app/shared/data-access/session-storage';
import { SettingsService } from './settings.service';

@Component({
    standalone: true,
    template: `
        <div class="settings-page">
            <div class="container page">
                <div class="row">
                    <div class="col-md-6 offset-md-3 col-xs-12">
                        <h1 class="text-xs-center">Your Settings</h1>

                        <form>
                            <fieldset>
                                <fieldset class="form-group">
                                    <input class="form-control" type="text" placeholder="URL of profile picture" />
                                </fieldset>
                                <fieldset class="form-group">
                                    <input class="form-control form-control-lg" type="text" placeholder="Your Name" />
                                </fieldset>
                                <fieldset class="form-group">
                                    <textarea
                                        class="form-control form-control-lg"
                                        rows="8"
                                        placeholder="Short bio about you"
                                    ></textarea>
                                </fieldset>
                                <fieldset class="form-group">
                                    <input class="form-control form-control-lg" type="text" placeholder="Email" />
                                </fieldset>
                                <fieldset class="form-group">
                                    <input
                                        class="form-control form-control-lg"
                                        type="password"
                                        placeholder="Password"
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
    providers: [SettingsService]
})
export default class SettingsComponent implements OnInit {
    settingsService = inject(SettingsService);
    storage = inject(SessionStorageService);

    settingsForm = inject(FormBuilder).nonNullable.group({
        image: ['', [Validators.required]],
        username: ['', [Validators.required]],
        bio: ['', [Validators.required]],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]]
    });

    ngOnInit(): void {
        const user = this.storage.getItem('user') as any;
        if (user) {
            this.settingsForm.patchValue(user);
        }
    }
}
