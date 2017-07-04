import {FormControl} from '@angular/forms';
export function createFileRequiredValidator(required: boolean) {
    return function validateFileRequired(c: FormControl) {
        const err = {
            required: required
        };

        if (required && !c.value) {
            return err;
        } else {
            return null;
        }
    };
}
