import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AccountService } from '../user/account.service';

@Injectable({ providedIn: 'root' })
export class unAuthorizedCheck implements CanActivate {
    constructor(private router: Router, private accountService: AccountService) {}

    canActivate() {
        const user = this.accountService.userInfo;
        if (!user?.Token) {
            return true;
        }

        this.router.navigate(['application/personal-information']);
        return false;
    }
}