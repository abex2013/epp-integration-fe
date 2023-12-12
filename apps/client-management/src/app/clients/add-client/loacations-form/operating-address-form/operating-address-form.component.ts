import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddClientStateService, OperatingAddressCreate } from 'apps/client-management/src/app/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CityService } from 'apps/client-management/src/app/core/services/city.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CityInStateService } from 'apps/client-management/src/app/core/services/CityInState.service';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { StateService } from 'apps/client-management/src/app/core/services/State.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'exec-epp-operating-address-form',
  templateUrl: './operating-address-form.component.html',
  styleUrls: ['./operating-address-form.component.scss']
})
export class OperatingAddressFormComponent implements OnInit {
  operatingAddress: OperatingAddressCreate[] = [];
  isVisible = false;
  isOkLoading = false;
  footer = null;
  forms: FormGroup;
  cityForms: FormGroup;
  countries: any;
  states: any;
  countryCities: any;
  cities: any;
  selectedCountry = '';
  statePlaceHolder='Select a State/Province';
  postalCode='Enter Postal/ZIP Code';
  selectedState = '';
  stateData = {
    country: '',
    state: '',
  };
  data='';
  emptyData=[];
  IsEdit=false;
  editAt=-1;
  found=false;
  actionTitle="Add"
  confirmModal?: NzModalRef;
  isClearButtonActive= true;
  constructor(
    private _fb: FormBuilder,
    private _state: StateService,
    private _city: CityService,
    private _cityInState: CityInStateService,
    private  addClientStateService:AddClientStateService,
    private modal: NzModalService
  ) {
    this.forms = _fb.group({
      Country: ['',Validators.required],
      City: ['',Validators.required],
      State: [''],
      ZipCode: ['',Validators.maxLength(70)],
      Address: ['',Validators.maxLength(250)],
    });
    this.cityForms = _fb.group({
      country: '',
      state: '',
    });
    this._state.getAll().subscribe((data: any) => {
      if (!data.error) {
        this.countries = data.data;
      }
    });
    this._city.getAll().subscribe((data: any) => {
      if (!data.error) {
        this.countryCities = data.data;
      }
    });
  }

  ngOnInit(): void {
    console.log("data="+ this.data)
    this. operatingAddress = this.addClientStateService.addClientData.OperatingAddress;
    this.forms.valueChanges.subscribe(x => {
      if(this.forms.value['Country']!='' ||
      this.forms.value['City']!='' ||
      this.forms.value['State']!='' ||
      this.forms.value['ZipCode']!='' ||
      this.forms.value['Address']!='' ){
       this.isClearButtonActive=false;
      }
      else{
       this.isClearButtonActive=true;
      }
    
    });
  }

  showModal(): void {
    this.isVisible = true;
    this.actionTitle="Add";
  }
  handleOk(): void {
    this.isOkLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  submitForm() {
    if (this.forms.valid) {
      if(this.IsEdit){
      this.operatingAddress[this.editAt]=this.forms.value;
      this.addClientStateService.updateOperatingAddress(this.operatingAddress);
      this.IsEdit=false;
      this.editAt=-1;
      }
     else{
      this.operatingAddress =[
        ...this.operatingAddress,
        this.forms.value
      ]
      this.addClientStateService.updateOperatingAddress(this.operatingAddress);
     }
    this.isVisible = false;
    this.forms.reset();
    this.isClearButtonActive=true;
    } else {
      Object.values(this.forms.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
   
  }
  getSelectedCountry() {
    this.selectedCountry = this.forms.value['Country'];
   if(!this.found){
    this.forms.controls['City'].setValue(null);
    this.forms.controls['State'].setValue(null);
    if(this.selectedCountry==="Ethiopia"){
      this.statePlaceHolder='Select a Region';
      this.postalCode='Enter Postal Code';
    }
    else{
      this.statePlaceHolder='Select a State/Province';
      this.postalCode='Enter Postal/ZIP Code';
    }
   }
    this.countries.forEach((country: any) => {
      if (country.name == this.selectedCountry) {
        this.states = country.states;
      }
    });
    this.countryCities.forEach((item: any) => {
      if (item.country == this.selectedCountry) {
        this.cities = item.cities;
      }
    });
  }
  getSelectedState() {
    this.selectedState = this.forms.value['State'];
    if(!this.found){
      this.forms.controls['City'].setValue(null);
     
     }
    this.getCityInState();
  }

  getCityInState() {
    this.stateData.country = this.selectedCountry;
    this.stateData.state = this.selectedState;
    this._cityInState
      .post(JSON.parse(JSON.stringify(this.stateData)))
      .subscribe((data: any) => {
        this.cities = data.data;
      });
  }

  resetForm() {
    this.forms.reset();
    this.isClearButtonActive= true;
  }
  removeOperatingAddress(index: number) {
    if (index > -1) {
      this.operatingAddress.splice(index, 1);
      if(!this.operatingAddress.length){
        this.operatingAddress=this.emptyData;
      }
      this.addClientStateService.updateOperatingAddress(this.operatingAddress);
    }
  }
  edit(index:number){
    for(let count=0;count<this.operatingAddress.length;count++){
      this.isVisible = true;
      if(count==index){
        this.actionTitle="Edit"
       this.IsEdit=true;
       this.editAt=index;
       this.found=true;
        this.patchValues(this.operatingAddress[count]);
      }
    }
   
  }
  patchValues(data: any) {
    this.forms.patchValue({
      Country: data.Country,
      City: data.City,
      State: data.State,
      ZipCode: data.ZipCode,
      Address: data.Address,
    });
    this.getSelectedCountry();
    this.getSelectedState();
    this.found=false;
  }
  showConfirm(index:number): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: 'Do you want to delete this item?',
      nzContent: 'The action is not recoverable. ',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOkText: 'Yes',
      nzCancelText: 'No',
      nzOnOk: () =>
        new Promise((resolve, reject) => {
          if (index > -1) {
            this.operatingAddress.splice(index, 1);
            if(!this.operatingAddress.length){
              this.operatingAddress=this.emptyData;
            }
            this.addClientStateService.updateOperatingAddress(this.operatingAddress);
          }
          setTimeout(Math.random() > 0.5 ? resolve : reject, 100);
        }).catch(() => console.log('Error.'))
    });
  }
}
