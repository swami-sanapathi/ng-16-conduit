import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ErrorService } from 'src/app/shared/services/errors.service';
import { FormErrors } from '../../shared-ui/form-errors.component';
import { LoginService } from './login.service';

@Component({
    standalone: true,
    template: `
        <div class="auth-page">
            <div class="container page">
                <div class="row">
                    <div class="col-md-6 offset-md-3 col-xs-12">
                        <h1 class="text-xs-center">Sign in</h1>
                        <p class="text-xs-center">
                            <a routerLink="/signup">Need an account?</a>
                        </p>

                        <app-form-error [errors]="errorService.errors()" />

                        <form [formGroup]="loginForm" (ngSubmit)="loginService.login(loginForm.getRawValue())">
                            <fieldset class="form-group">
                                <input
                                    class="form-control form-control-lg"
                                    type="text"
                                    formControlName="email"
                                    placeholder="Email"
                                />
                            </fieldset>
                            <fieldset class="form-group">
                                <input
                                    class="form-control form-control-lg"
                                    type="password"
                                    formControlName="password"
                                    placeholder="Password"
                                />
                            </fieldset>
                            <button class="btn btn-lg btn-primary pull-xs-right">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [FormErrors, ReactiveFormsModule, RouterLink],
    providers: [LoginService, ErrorService, AuthService]
})
export default class LoginComponent {
    loginForm = inject(NonNullableFormBuilder).group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });

    loginService = inject(LoginService);
    errorService = inject(ErrorService);
}
