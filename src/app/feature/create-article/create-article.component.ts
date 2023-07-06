import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    standalone: true,
    template: `
        <div class="editor-page">
            <div class="container page">
                <div class="row">
                    <div class="col-md-10 offset-md-1 col-xs-12">
                        <form [formGroup]="form" (ngSubmit)="form.valid && submit()">
                            <fieldset>
                                <fieldset class="form-group">
                                    <input
                                        type="text"
                                        class="form-control form-control-lg"
                                        placeholder="Article Title"
                                        formControlName="title"
                                    />
                                </fieldset>
                                <fieldset class="form-group">
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="What's this article about?"
                                        formControlName="description"
                                    />
                                </fieldset>
                                <fieldset class="form-group">
                                    <textarea
                                        class="form-control"
                                        rows="8"
                                        placeholder="Write your article (in markdown)"
                                        formControlName="body"
                                    ></textarea>
                                </fieldset>
                                <fieldset class="form-group">
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Enter tags"
                                        #tagInput
                                        (keyup.enter)="addTag(tagInput)"
                                    />
                                    <div class="tag-list" *ngIf="form.get('tagList')?.value?.length">
                                        <span
                                            class="tag-pill tag-default"
                                            *ngFor="let tag of form.get('tagList')?.value"
                                        >
                                            <i class="ion-close-round" (click)="removeTag(tag)"></i>
                                            {{ ' ' + tag }}
                                        </span>
                                    </div>
                                </fieldset>
                                <button
                                    class="btn btn-lg pull-xs-right btn-primary"
                                    type="button"
                                    [disabled]="form.invalid"
                                >
                                    Publish Article
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ReactiveFormsModule, NgFor, NgIf]
})
export default class CreateArticleComponent {
    form = inject(NonNullableFormBuilder).group({
        title: ['', [Validators.required, Validators.minLength(3)]],
        description: ['', [Validators.required, Validators.minLength(3)]],
        body: ['', [Validators.required, Validators.minLength(3)]],
        tagList: new FormControl<string[]>([], [Validators.required])
    });

    addTag(tag: HTMLInputElement) {
        if (!tag?.value) return;

        this.form.value.tagList?.push(tag.value);
    }

    removeTag(tag: string) {
        this.form.value.tagList = this.form?.value?.tagList?.filter((t) => t !== tag);
    }

    submit() {
        console.log(this.form.getRawValue());
    }
}
