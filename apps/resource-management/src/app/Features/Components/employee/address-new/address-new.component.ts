/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/no-output-native */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Address } from '../../../Models/address.model';
import { AttendanceService } from '../../../Services/address/attendance.service';
import { EmployeeService } from '../../../Services/Employee/EmployeeService';
import { LocationPhoneService } from '../../../Services/address/location-phone.service';
import { ResponseDto } from '../../../Models/response-dto.model';
import { Data, Router } from '@angular/router';

export function extractSpaces(value: string): string {
  let result = ''
  for (let i = 0; i < value.length; i++) {
    if (value[i] !== ' ' && !(i === 0 && value[i] === '0')) {
      result = result + value[i]
    }
  }
  return result
}
@Component({
  selector: 'app-address-new',
  templateUrl: './address-new.component.html',
  styleUrls: ['./address-new.component.scss']
})
export class AddressNewComponent implements OnInit {


  //===========
  listOfData: readonly Data[] = [];
  isConfirmLoading = false;
  i = 0;
  //=======================
  countries: string[] = []
 
  listofCodes: string[] = []

  listOfStates: string[] = []

  isEthiopia = false;
  isVisible =false;
  buttonClicked = 0

  addressForm!: FormGroup;

  addresses: Address[] = []

  @Output() result: EventEmitter<{ type: string, addresses: Address[] }> = new EventEmitter<{ type: string, addresses: Address[] }>()


  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _locationPhoneService: LocationPhoneService,
    private _employeeService: EmployeeService,
    private _attendanceService: AttendanceService
  ) {
    this._locationPhoneService.getListofCountries()
      .subscribe((response: string[]) => {
        this.countries = response
      })
    this._locationPhoneService.getCountriesPhoneCode()
      .subscribe((response: string[]) => {
        this.listofCodes = response
      })
    this.listOfStates = []
    this.addresses = this._employeeService.getPersonalAddresses()
  }

  ngOnInit(): void {
    this.addressForm = this.createForm()
  }

  createForm() {
    return this.fb.group({
      country: [null, [this.checkCountry]],
      state: [null, [this.checkStateReginProvince]],
      city: [null, [this.checkCity]],
      subCityZone: [null, [this.checkSubCityZoneAddressline1]],
      woreda: [null, [this.checkWeredaAddressline2]],
      houseNumber: [null],
      postalCode: [null, [this.checkPostalZipCode]],
      phoneNumberPrefix: ['+251'],
      residencialPhoneNumber: [null, [this.checkPhoneNumber]]
    });
  }

  checkCountry = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true }
    } else if (this.countries.indexOf(control.value) < 0) {
      return { confirm: true, error: true };
    } else {
      return {}
    }
  }

  checkStateReginProvince = (control: FormControl): { [s: string]: boolean } => {
    if (this.listOfStates.length === 0) {
      return { required: false }
    } else {
      if (control.value === null) {
        return { required: true }
      } else if (this.listOfStates.indexOf(control.value) < 0) {
        return { confirm: true, error: true };
      } else {
        return {}
      }

    }
  }

  checkCity = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true }
    } else {
      return {}
    }
  }

  checkSubCityZoneAddressline1 = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true }
    } else {
      return {}
    }
  }

  checkWeredaAddressline2 = (control: FormControl): { [s: string]: boolean } => {
    if (this.isEthiopia && !control.value) {
      return { required: true }
    } else {
      return {}
    }
  }

  checkPostalZipCode = (control: FormControl): { [s: string]: boolean } => {
    if (this.isEthiopia && !control.value) {
      return { required: true }
    } else {
      return {}
    }
  }

  checkPhoneNumber = (control: FormControl): { [s: string]: boolean } => {
    control.setErrors(null)
    // Check if it is empty
    if (!control.value) {
      return { required: true };
    }

    // Check if the input contains charaters othr than space and digits
    const phone: string = extractSpaces(control.value)
    for (let i = 0; i < phone.length; i++) {
      if ('0123456789 '.indexOf(phone[i]) < 0) {
        return { confirm: true, error: true };
      }
    }
    if (phone.length < 8 || phone.length > 15) {
      return { confirm: true, error: true };
    }
    return {};
  }

  onSelectCountry() {
    if (this.addressForm.value.country !== '') {
      this._locationPhoneService.getListofStates(this.addressForm.value.country)
        .subscribe((response: string[]) => {
          this.listOfStates = response
        });
    }

    else {
      this.listOfStates = []
    }
    if (this.addressForm.value.country === 'Ethiopia') {
      this.isEthiopia = true
    }
    else {
      this.isEthiopia = false
    }
  }

  onAction(event: string) {

    if (event === 'back') {
      this._employeeService.setEmployeeData(
        {
          EmployeeAddress: this.addresses
        }
      )
      this._router.navigateByUrl('/Organization-Detail')
    }
    else {
      if (this.addressForm.valid) {
        const address = {
          Country: this.addressForm.value.country,
          StateRegionProvice: this.addressForm.value.state,
          City: this.addressForm.value.city,
          SubCityZone: this.addressForm.value.subCityZone,
          Woreda: this.addressForm.value.wereda,
          HouseNumber: this.addressForm.value.houseNumber,
          PostalCode: this.addressForm.value.postalCode,
          PhoneNumber: this.addressForm.value.phoneNumberPrefix +
            extractSpaces(this.addressForm.value.residencialPhoneNumber)
        } as Address

        this.addresses = [
          ...this.addresses,
          address
        ]

        console.log(this.addresses)

        if (event === 'submit') {
          this.addressForm = this.createForm()
        }
        else {
          this._employeeService.setEmployeeData(
            {
              EmployeeAddress: this.addresses
            }
          )
          this._router.navigateByUrl('/emergency-contact')
        }
      } else {
        Object.values(this.addressForm.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    }

  }



  addRow(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        id: `${this.i}`,
        name: `Edward King ${this.i}`,
        age: '32',
        address: `London, Park Lane no. ${this.i}`
      }
    ];
    this.i++;
  }


  handleOk(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        id: `${this.i}`,
        name: `Edward King ${this.i}`,
        age: '32',
        address: `London, Park Lane no. ${this.i}`
      }
    ];
    this.i++;
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);

  }

  handlereset(): void {
    this.addressForm.reset();
    this.isVisible = false;
  }


}
