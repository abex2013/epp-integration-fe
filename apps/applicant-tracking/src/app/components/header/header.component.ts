import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../../services/user/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logoUrl = 'assets/logos/main-logo.png';

  constructor(private accountService: AccountService, private router: Router) { }
  user : any ;
 

  ngOnInit(): void {
    this.user = this.accountService.userInfo;
    //console.log(this.user);
  }

  logout(){
    this.accountService.signOut();
  }
  signout() {
    this.accountService.signOut();
    this.router.navigate(['/user/signin']);

  }

}
