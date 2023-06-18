import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrors } from '../../shared-ui/form-errors.component';
import { FormLayout } from '../../shared-ui/form-layout.component';
import { Signup } from './signup.service';

@Component({
    standalone: true,
    template: `
        <app-form-layout class="auth-page" contentClass="col-md-6 offset-md-3 col-xs-12">
            <h1 class="text-xs-center">Sign up</h1>
            <p class="text-xs-center">
                <a href="">Have an account?</a>
            </p>

            <app-form-error></app-form-error>

            <form [formGroup]="signupForm" (ngSubmit)="signup()">
                <fieldset class="form-group">
                    <input
                        class="form-control form-control-lg"
                        type="text"
                        formControlName="username"
                        placeholder="Your Name"
                    />
                </fieldset>
                <fieldset class="form-group">
                    <input
                        type="email"
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
                <button class="btn btn-lg btn-primary pull-xs-right">Sign up</button>
            </form>
        </app-form-layout>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ReactiveFormsModule, FormLayout, FormErrors],
    providers: [Signup]
})
export default class SignupComponent {
    signupForm = inject(NonNullableFormBuilder).group({
        username: ['', [Validators.required]],
        email: ['', [Validators.email, Validators.required]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]]
    });

    signupService = inject(Signup);

    signup() {
        console.log(this.signupForm.getRawValue());
        this.signupService.signup(this.signupForm.getRawValue());
    }
}
