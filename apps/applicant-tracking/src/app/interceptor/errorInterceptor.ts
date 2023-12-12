import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from '../services/user/account.service';


@Injectable()
export class errorInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401].includes(err.status) && JSON.stringify(this.accountService.userInfo) != JSON.stringify({})) {
                this.accountService.signOut();
            }
            const error = err.error?.Message || err.statusText;
            console.log(err);
            return throwError(error);
        }))
    }
}