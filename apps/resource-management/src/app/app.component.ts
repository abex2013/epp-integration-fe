import { Component, Input, OnInit } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Employee } from './Features/Models/Employee';
import { EmployeeService } from './Features/Services/Employee/EmployeeService';
import { Router } from '@angular/router';

@Component({
  selector: 'exec-epp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'resource-management';


  
  isdefault= false;

  constructor(private _router: Router) {

    // this._router.events.subscribe((url: any) => console.log(url));
    // this.router = this._router.url;

  }
}
