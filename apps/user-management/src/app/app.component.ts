import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'exec-epp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'user-management';
  /**
   *
   */
  constructor(private authService: MsalService) {
  
    
  }

  isLoggedIn(): boolean {
    return this.authService.instance.getActiveAccount() != null;
  }
}

