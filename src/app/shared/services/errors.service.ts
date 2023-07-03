import { Injectable, signal } from '@angular/core';

@Injectable()
export class ErrorService {
    #errors = signal<string[]>([]);
    errors = this.#errors.asReadonly();

    setErrors(errors: Record<string, string[]>) {
        console.log(errors);
        
        this.#errors.set(processErrors(errors));
    }
}

export function processErrors(errors: Record<string, string[]>) {
    const errorEntries = Object.entries(errors);
    return errorEntries.reduce((errArr, curr) => {
        errArr.push(...curr[1].map((m: string) => `${curr[0]} ${m}`));
        return errArr;
    }, [] as string[]);
}
