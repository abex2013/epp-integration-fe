import { Component, OnInit } from '@angular/core';
import{MsalService} from '@azure/msal-angular';
import{AuthenticationResult} from '@azure/msal-browser'
import { MsalGuardConfiguration } from '@azure/msal-angular';


@Component({
  selector: 'exec-epp-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],

})
export class SigninComponent implements OnInit {

  constructor(private authService: MsalService) {

  }
  ngOnInit(): void {
    this.authService.instance.handleRedirectPromise().then( res => {
      if (res != null && res.account != null) {
        this.authService.instance.setActiveAccount(res.account)
      }
    })
  }

  isLoggedIn(): boolean {
    return this.authService.instance.getActiveAccount() != null
  }

  login() {
    // this.authService.loginRedirect();

    this.authService.loginPopup()
      .subscribe((response: AuthenticationResult) => {
        this.authService.instance.setActiveAccount(response.account);
        window.location.reload();
      });
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }
}

