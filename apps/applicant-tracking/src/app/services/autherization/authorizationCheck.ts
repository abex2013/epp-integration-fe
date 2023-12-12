import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '../user/account.service';

@Injectable({ providedIn: 'root' })
export class AuthorizationCheck implements CanActivate {
    constructor(private router: Router, private accountService: AccountService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userInfo;
        console.log(user);
        if (user.Token) {
            return true;
        }

        this.router.navigate(['/user/signin']
           // , { queryParams: { returnUrl: state.url }}
            );
        return false;
    }
}