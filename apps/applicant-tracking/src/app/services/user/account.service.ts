import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { PersonalInformation } from '../../models/personal-information';
import { ResponseDTO } from '../../models/ResponseDTO';
import { SignInRequest } from '../../models/user/signInRequest';
import { SignInResponse } from '../../models/user/signInResponse';
import { SignUpRequest } from '../../models/user/signUpRequest';
import { SignUpResponse } from '../../models/user/signUpResponse';

@Injectable({
  providedIn: 'root'
})

export class AccountService {
  private userSubject :BehaviorSubject<SignInResponse|any>;
  public user: Observable<SignInResponse>;
  loggedInUser:any;

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<SignInResponse|null>(JSON.parse(localStorage.getItem('loggedInUserInfo')||'{}'));
    this.user = this.userSubject.asObservable();
  }

  public get userInfo(): SignInResponse {
      return this.userSubject.value;
  }

  signIn(signInRequest: SignInRequest) {
    
      return this.http.post<ResponseDTO<SignInResponse>>(environment.apiUrl + '/Signin/Sign-In', signInRequest).pipe(
        map((user) => {
          if(user.Data && user.Data.Token){
            localStorage.setItem('loggedInUserInfo', JSON.stringify(user.Data ||'{}'));
            this.loggedInUser = user.Data;
            this.userSubject.next(user.Data);
            return user;
          }
          return user;
        }
      ));
  };
  

  signUp(signUpRequest: SignUpRequest) {
    return this.http.post<ResponseDTO<SignUpResponse>>(environment.apiUrl + '/Signup/Sign-Up', signUpRequest);
  };

  generalInfo(email?:string){
    return this.http.get<ResponseDTO<PersonalInformation>>(environment.apiUrl + '?email=' + email);
  }

  signOut() {
    localStorage.removeItem('loggedInUserInfo');
    this.userSubject.next(null);
    this.router.navigate(['user/signin']);
    window.location.reload();

  }

}
