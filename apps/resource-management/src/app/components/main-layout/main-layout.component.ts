import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../Features/Services/Employee/EmployeeService';

@Component({
  selector: 'exec-epp-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor() { }

  
  title = 'client';
  onBack(): void {
    console.log('onBack');
  }

  ngOnInit(): void {
  }

}
