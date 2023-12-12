import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { SigninComponent } from '../../components/user/signin/signin.component';
import { SignupComponent } from '../../components/user/signup/signup.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../services/user/account.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { httpInterceptor } from '../../interceptor/httpInterceptor';
import { AuthorizationCheck } from '../../services/autherization/authorizationCheck';

@NgModule({
  declarations: [SignupComponent, SigninComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedModule,
  ],
  providers:[{ provide: HTTP_INTERCEPTORS, useClass: httpInterceptor, multi: true }, 
    AuthorizationCheck, AccountService]
})
export class UserModule { }
