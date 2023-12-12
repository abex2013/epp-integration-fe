import { Component, OnInit } from '@angular/core';

import { Address } from '../../../Models/address.model';
import { Employee } from '../../../Models/Employee';
import { EmployeeService } from '../../../Services/Employee/EmployeeService';
import { Router } from '@angular/router';

@Component({
  selector: 'exec-epp-personal-addresses',
  templateUrl: './personal-addresses.component.html',
  styleUrls: ['./personal-addresses.component.scss']
})
export class PersonalAddressesComponent implements OnInit {


  constructor(
    private readonly _route: Router,
    private readonly _employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
  }

  onAction(event: {type: string, addresses: Address[]}){

    const employee = {
      EmployeeAddress: event.addresses
    }
    this._employeeService.setEmployeeData(employee);


    if(event.type === "back"){
      this._route.navigateByUrl('/personal-info')
    }
    else{
      this._route.navigateByUrl('/personal-info')
    }
  }



}
