import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PersonalInformation } from '../../models/personal-information';
import { NotificationBar } from '../../utils/feedbacks/notification';
import { ApplicantGeneralInfoService } from '../applicant/applicant-general-info.service';
import { AccountService } from '../user/account.service';

@Injectable({ providedIn: 'root' })
export class aoiGuard implements CanActivate {
    constructor(private router: Router, private accountService:AccountService, 
      private personalInfoService: ApplicantGeneralInfoService, 
      private notification: NotificationBar,) {}
    generalInfo = {} as PersonalInformation;
    profile = <PersonalInformation>{}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):any {
        const user = this.accountService.userInfo;
        console.log(user.Guid);
        this.personalInfoService
        .getPersonalInfo({ email: user.Email })
        .subscribe((response) => {
          if(!response.Data.ContactNumber){
            this.notification.showNotification({
              type: 'info',
              content: 'You first need to finish filling the Personal Information Section.',
              duration: 5000,
            });
            this.router.navigateByUrl('application/personal-information');
            return false;
          }
      
        return true;
    });
}
}