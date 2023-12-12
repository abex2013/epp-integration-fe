import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IValidator } from '../interfaces/validator';
import { Injectable } from '@angular/core';
import phone from 'phone';

@Injectable({
  providedIn: 'root',
})
export class FormValidator implements IValidator {
  validatePassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;
      const re =  /^(?=.*[A-Za-z])(?=.*[\d$@.!%*#?&])[A-Za-z\d$@.!%*#?&]{8,}$/;
      const isValid = re.test(String(password).toLowerCase());
      return !isValid ? { value: control.value } : null;
    };
  }
  validateConfirmPassword(password: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = password !== control.value;
      return isValid ? { value: control.value } : null;
    };
  }

  validateName(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const name = control.value;
      const isValid = name.match('^[a-zA-Z]*$') && name.length >= 2;
      return !isValid ? { value: control.value } : null;
    };
  }

  validateEmail(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const email = control.value;
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const isValid = re.test(String(email).toLowerCase());
      return !isValid ? { value: control.value } : null;
    };
  }

  validatePhoneNumber(dial_code: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const phonenumber = dial_code + control.value;
      const { isValid } = phone(phonenumber);
      return !isValid ? { value: control.value } : null;
    };
  }

  validateMonthsOfExperience(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = control.value >= 0 && control.value <= 11;
      return !isValid ? { value: control.value } : null;
    };
  }
  validateYearOfExperience(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isValid = control.value >= 0;
      return !isValid ? { value: control.value } : null;
    };
  }

  validateIsStudying(isStudying: boolean): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isStudying) return null;
      return control.value ? null : { value: control.value };
    };
  }
}
