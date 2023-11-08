import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateArticleService } from './create-article.service';

@Component({
    standalone: true,
    template: `
        <div class="editor-page">
            <div class="container page">
                <div class="row">
                    <div class="col-md-10 offset-md-1 col-xs-12">
                        <form [formGroup]="form" (ngSubmit)="newArticleService.publishArticle(form.getRawValue())">
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
                                    @if (tags.length) {
<div class="tag-list">
                                        @for (tag of tags; track tag) {
  <span class="tag-pill tag-default">
                                            <i class="ion-close-round" (click)="removeTag(tag)"></i>
                                            {{ ' ' + tag }}
                                        </span>
}
                                    </div>
}
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
    imports: [ReactiveFormsModule, NgFor, NgIf],
    providers: [CreateArticleService]
})
export default class CreateArticleComponent {
    newArticleService = inject(CreateArticleService);

    form = inject(NonNullableFormBuilder).group({
        title: ['', [Validators.required]],
        description: ['', [Validators.required]],
        body: ['', [Validators.required]],
        tagList: new FormControl<string[]>([], [Validators.required])
    });

    tags: string[] = [];

    addTag(tag: HTMLInputElement) {
        if (!tag?.value?.trim()) return;

        // Don't push the same tag twice
        if (this.tags?.includes(tag.value)) return;
        this.tags?.push(tag.value);
        this.form.patchValue({ tagList: this.tags });

        tag.value = '';
        return;
    }

    removeTag(tag: string) {
        this.tags = this.tags?.filter((t) => t !== tag);
        this.form.patchValue({ tagList: this.tags });
    }
}
