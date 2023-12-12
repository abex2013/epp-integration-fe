import { Component, OnInit } from '@angular/core';
import { UserService } from './timesheet/services/user.service';

@Component({
  selector: 'exec-epp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'timesheet';

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    let userId = "c0b74644-b81a-4c33-a6b0-672ba4bc8cb2";
    localStorage.setItem("userId", userId.toString());
    /*
    this.userService.loadCurrentUser().subscribe(response => {
      let index = Math.floor(response.length * Math.random());
      let userId = response[index].id;
      localStorage.setItem("userId", userId.toString());
    });
    //*/
  }
}
