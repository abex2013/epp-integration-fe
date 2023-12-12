import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AccountService } from '../../../services/user/account.service';
import { FormValidator } from '../../../utils/validator';
import { Router } from '@angular/router';
import { NotificationBar } from '../../../utils/feedbacks/notification';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  showPassword = false;
  loading: boolean = false;

  constructor(private validator: FormValidator,private accountService: AccountService, 
    private router: Router, private notification: NotificationBar,) {}

  signUpForm = new FormGroup({
    firstName: new FormControl('', [
      this.validator.validateName(),
      Validators.required,
    ]),
    lastName: new FormControl('', [
      this.validator.validateName(),
      Validators.required,
    ]),
    email: new FormControl('', [
      this.validator.validateEmail(),
      Validators.required,
    ]),
    password: new FormControl('', [
      this.validator.validatePassword(),
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('', [
      this.validator.validatePassword(),
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  get signUpEmail(): AbstractControl | null {
    return this.signUpForm?.get('email');
  }
  get signUpPassword(): AbstractControl | null {
    return this.signUpForm?.get('password');
  }
  get signUpConfirmPassword(): AbstractControl | null {
    return this.signUpForm?.get('confirmPassword');
  }

  signup() {
    this.loading = true;
    this.accountService.signUp(this.signUpForm.value).subscribe(response => {
      this.loading = false;
      this.router.navigateByUrl('/');
      this.notification.showNotification({
        type: 'success',
        content: 'Successfully Registered. Please login to continue!',
        duration: 5000,
      });
    }, error => {
      this.loading = false;
      console.log(error);
      this.notification.showNotification({
        type: 'error',
        content: error,
        duration: 5000,
      });
    })
  }

  togglePasswordView() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {
    this.signUpForm.controls.password.valueChanges.subscribe((val) => {
      this.signUpForm.controls.confirmPassword.setValidators([
        this.validator.validateConfirmPassword(val),
        this.validator.validatePassword(),
        Validators.required,
        Validators.minLength(8),
      ]);
      this.signUpForm.controls.confirmPassword.updateValueAndValidity();
    });
  }
}
