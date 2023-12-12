import { AbstractControl,  ValidationErrors, ValidatorFn } from '@angular/forms';

export function ValidateFutureDate() : ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
    const currentDateTime = new Date();
    const controlDate = new Date(control.value);
    if (control?.pristine ) {
        return null;
    }
    return (!(controlDate <= currentDateTime)) ? { error: true, isFutureDate:true}: null;
    }
}