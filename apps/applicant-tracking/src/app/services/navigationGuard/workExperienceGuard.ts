import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PersonalInformation } from '../../models/personal-information';
import { NotificationBar } from '../../utils/feedbacks/notification';
import { ApplicantGeneralInfoService } from '../applicant/applicant-general-info.service';
import { AreasOfInterestService } from '../applicant/areas-of-interest.service';
import { AccountService } from '../user/account.service';

@Injectable({ providedIn: 'root' })
export class educationGuard implements CanActivate {
    constructor(private router: Router, private accountService:AccountService, 
      private educationService: AreasOfInterestService, 
      private notification: NotificationBar) {}
      
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):any {
        const user = this.accountService.userInfo;

        this.educationService.getApplicantAreaOfInterestByID(user.Guid)
        .subscribe((response) => {
          if(response.Data === null){
            this.notification.showNotification({
              type: 'info',
              content: 'You first need to finish filling the Education Section.',
              duration: 5000,
            });
            this.router.navigateByUrl('application/area-of-interest');
            return false;
          }
      
        return true;
    });
}
}