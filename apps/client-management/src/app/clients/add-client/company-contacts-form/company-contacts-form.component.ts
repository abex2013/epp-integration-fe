import {
  AddClientStateService,
  CompanyContactCreate,
  Employee,
  EmployeeService,
} from '../../../core';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { BehaviorSubject } from 'rxjs';
import { CompanyContactService } from '../../../core/services/company-contact.service';
import { CountryCodeService } from '../../../core/services/country-code.service';
import { HttpClient } from '@angular/common/http';
import { NzModalService } from 'ng-zorro-antd/modal';
import { extractPhoneNumber } from '../../../shared/phonePrefixExtractor/phone-prefix-extractor';
import { getNames } from '../../../shared/Data/contacts';

@Component({
  selector: 'exec-epp-company-contacts-form',
  templateUrl: './company-contacts-form.component.html',
  styleUrls: ['./company-contacts-form.component.scss'],
})
export class CompanyContactsFormComponent implements OnInit {
  emailAdress = new FormControl('');
  phoneNumber = new FormControl('');
  phoneNumberPrefix=new FormControl('');
  searchChange$ = new BehaviorSubject('');
  employees = [] as Employee[];
  selectedUser?: string;
  isLoading = false;
  contactDetail = {} as Employee;
  listofContactNames = getNames();
clientalreadyExist=false;
  @Input() isVisible: boolean;
  @Input() editable: boolean = false;

  countries: string[] = [];
  footer = null;
  modalTitle: string

  listofCodes: { value: string; label: string }[] = [];

  listOfStates: string[] = [];

  addContactForm!: FormGroup;
  listData: any[] = [];
  comapanyContacts = [] as CompanyContactCreate[];
  isModalVisible = false;
  loading = false;
  IsEdit=false;
  editAt=-1;
  found=false;
  clientExist='';
  constructor(
    private employeeService: EmployeeService,
    private _companyContactService: CompanyContactService,
    private http: HttpClient,
    private fb: FormBuilder,
    private modal: NzModalService,
    private _countryService: CountryCodeService,
    private addClientStateService: AddClientStateService
  ) {
    this.listofCodes = this._countryService.getPhonePrefices();
  }


  ngOnInit(): void {
    this.employeeService.getAll().subscribe((response: Employee[]) => {
      this.employees = response;
    });

    this.listData = this.addClientStateService.getClientcomapanyContacts ;
    this.addContactForm = this.fb.group({
      companyContactName: ['', [Validators.required]],
      phoneNumber: ['', []],
      phoneNumberPrefix: ['+251', []],

      emailAdress: ['', []],
    });

    this.employeeService.getAll().subscribe((response: Employee[]) => {
      this.employees = response;
    });
  }

  showModal(): void {
    this.modalTitle = (this.IsEdit? 'Edit': 'Add') + ' Client Contact'
    this.isVisible = true;
  }
  submitForm(): void {
    if (this.addContactForm.valid) {
      this.listData.forEach((value: any, index: any) => {
        if (value.companyContactName==this.addContactForm.value['companyContactName'])
        {
        this.clientalreadyExist=true;

        }

      });
      if(!this.IsEdit){
       if(!this.clientalreadyExist){
        this.listData = [...this.listData, this.addContactForm.value];
        this.comapanyContacts.push({
          ContactPersonGuid: this.contactDetail.Guid,
        });
        this.isVisible = false;
        this.addClientStateService.updateCompanyContacts(this.comapanyContacts);
        this.addClientStateService.updateClientcomapanyContacts(this.listData);
        this.addContactForm.reset();
       }
       else{
         this.clientExist="Exist."
         this.clientalreadyExist=false;
       }
      }
     else{
        this.listData[this.editAt]=this.addContactForm.value;
        this.IsEdit=false;
        this.editAt=-1;
        this.isVisible = false;
        this.addClientStateService.updateCompanyContacts(this.comapanyContacts);
        this.addClientStateService.updateClientcomapanyContacts(this.listData);
        this.addContactForm.reset();
      }

    } else {
      Object.values(this.addContactForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }

  }
  handleOk(): void {
    // if (this.addContactForm.valid) {
    //   this.listData = [...this.listData, this.contactDetail];
    //   this.comapanyContacts.push({
    //     ContactPersonGuid: this.contactDetail.Guid,
    //   });
    //   this.addClientStateService.updateCompanyContacts(this.comapanyContacts);
    //   this.addContactForm.reset();
    //   this.isVisible = false;
    // } else {
    //   Object.values(this.addContactForm.controls).forEach((control) => {
    //     if (control.invalid) {
    //       control.markAsDirty();
    //       control.updateValueAndValidity({ onlySelf: true });
    //     }
    //   });
    // }
    // this.addClientStateService.updateCompanyContacts(this.comapanyContacts);
    // this.addContactForm.reset();
  }
  edit(index:number){
    for(let count=0;count<this.listData.length;count++){

      if(count==index){
       this.IsEdit=true;
       this.modalTitle = (this.IsEdit? 'Edit': 'Add') + ' Client Contact'
       this.isVisible = true;
       this.editAt=index;
       this.found=true;
        this.patchValues(this.listData[count]);
      }
    }

  }
  patchValues(data: any) {
    const phonePrefix=extractPhoneNumber(data.phoneNumberPrefix)

    this.addContactForm.patchValue({
      companyContactName: data.companyContactName,
      phoneNumber: data.phoneNumber,
      emailAdress: data.emailAdress,
      phoneNumberPrefix: phonePrefix.prefix,


    });
    // this.getSelectedCountry();
    // this.getSelectedState();
    this.found=true;
  }
  exitModal() {
    this.isVisible = false;
  }
  handleClear(): void {
    console.log('Button cancel clicked!');

    this.addContactForm.reset();
  }
  removeItem(element: Employee) {
    this.listData.forEach((value: Employee, index: any) => {
      if (value == element)
      {
        this.listData.splice(index, 1);
        this.comapanyContacts.slice(index,1);
      }
    });

    this.comapanyContacts.forEach((value: CompanyContactCreate, index: any) => {
      if (value.ContactPersonGuid == element.Guid)
        this.listData.splice(index, 1);
    });
    this.addClientStateService.updateCompanyContacts(this.comapanyContacts);
    this.addClientStateService.updateClientcomapanyContacts(this.listData);
  }
  showDeleteConfirm(element: any): void {
    this.modal.confirm({
      nzTitle: 'Are you sure, you want to cancel this contact?',
      nzContent: '<b style="color: red;"></b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.removeItem(element);
      },
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  deleteBackEnd(element: any) {}

  getClientContact() {
    console.log(this.addContactForm.value.companyContactName);


    this.contactDetail = this.getClientDetails(
      this.addContactForm.value.companyContactName
    );

    this.addContactForm.controls['phoneNumber'].setValue(
      this.contactDetail.PhoneNumberPrefix+''+ this.contactDetail.Phone
    );

    this.addContactForm.controls['emailAdress'].setValue(
      this.contactDetail.Email
    );

  }

  getClientDetails(name: string) {
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i].Name +'-'+this.employees[i].Role === name) {
        return this.employees[i];
      }
    }
    return this.employees[1];
  }

}
