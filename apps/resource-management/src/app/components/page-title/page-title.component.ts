import { Component, OnInit } from '@angular/core';
import { DatePipe, formatDate } from '@angular/common';
import {
  EmergencyContact,
  EmergencyContacts,
  IEmergencyContact,
} from '../../Features/Models/emergencycontact';

import { Address } from '../../Features/Models/address.model';
import { Employee } from '../../Features/Models/Employee';
import { EmployeeOrganization } from '../../Features/Models/EmployeeOrganization/EmployeeOrganization';
import { EmployeeService } from '../../Features/Services/Employee/EmployeeService';
import { FamilyDetail } from '../../Features/Models/FamilyDetail/FamilyDetailModel';
import { FormGenerator } from '../../Features/Components/custom-forms-controls/form-generator.model';
import { ICountry } from '../../Features/Models/EmployeeOrganization/Country';
import { Nationality } from '../../Features/Models/Nationality';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'exec-epp-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss'],
})
export class PageTitleComponent implements OnInit {
  save = 'Save';

  constructor(
    private _formGenerator: FormGenerator,
    private _router: Router,
    private _employeeService: EmployeeService,
    private notification: NzNotificationService
  ) {
    this.save = this._employeeService.save;
  }
  employee!: Employee;
  selectednationality: Nationality[] = [];
  organization!: EmployeeOrganization;
  country!: ICountry;
  familyDetail: FamilyDetail[] = [];
  emergencyContacts: IEmergencyContact[] = [];

  dateofBirth = new Date('2021-11-17 14:29:03.107');

  ngOnInit(): void {}

  saveNext() {
    if (!this._formGenerator.personalDetailsForm.valid) {
      alert('Please enter a valid Personal detail!');
      this._formGenerator.errorMessageforPersonalDetails(
        this._formGenerator.personalDetailsForm
      );
      this._router.navigate(['employee/add-employee/personal-info']);
    } else if (this._formGenerator.allAddresses.length === 0) {
      alert('A minimum of one address required. Please enter your address(es)');
      this._router.navigate(['employee/add-employee/address-view']);
    } else if (this._formGenerator.allEmergencyContacts.length === 0) {
      alert(
        'A minimum of one emergency contact is required. Please enter your emergency contact(s)'
      );
      this._router.navigate(['employee/add-employee/emergencycontacts-view']);
    } else if (!this._formGenerator.organizationalForm.valid) {
      alert('Please enter a valid  Organizational detail');
      this._formGenerator.errorMessageforOrganizationDetails(
        this._formGenerator.organizationalForm
      );
      this._router.navigate(['employee/add-employee/Organization-Detail']);
    } else {
      if (this._employeeService.isEdit) {
        this._formGenerator.updateOneEmployee();
      } else {
        this._formGenerator.save();
      }

      this._router.navigate(['']);
    }
  }
  Cancel() {
    this._employeeService.isdefault = true;
    this._router.navigate(['']);
  }
}
