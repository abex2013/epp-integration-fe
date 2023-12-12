import { AbstractControl, ValidationErrors } from "@angular/forms";

export interface IValidator {
    validateConfirmPassword(c: AbstractControl, password:any): ValidationErrors | null;
    validateEmail(c: AbstractControl): ValidationErrors | null;
    validateName(c: AbstractControl): ValidationErrors | null;
    validatePassword(c: AbstractControl): ValidationErrors | null;
    
}