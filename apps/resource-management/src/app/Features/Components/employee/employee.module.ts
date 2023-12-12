import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';

import { AddressNewComponent } from './address-new/address-new.component';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DemoNgZorroAntdModule } from '../../../ng-zorro-antd.module';
import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { FamilyDetailComponent } from './family-detail/family-detail.component';
import { NgModule } from '@angular/core';
import { OrganizationDetailComponent } from './organization-detail/organization-detail.component';
import { PersonalAddressesComponent } from './personal-addresses/personal-addresses.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { SideBarComponent } from './side-bar/side-bar.component';

import { AddressViewComponent } from './address-view/address-view.component';
import { FamilyDetailViewComponent } from './family-detail-view/family-detail-view.component';
import { EmergencycontactViewComponent } from './emergencycontact-view/emergencycontact-view.component';
import { CustomFormsControlsModule } from '../custom-forms-controls/custom-forms-controls.module';
import { PageTitleComponent } from '../../../components/page-title/page-title.component';

// eslint-disable-next-line @typescript-eslint/no-unused-vars


//


@NgModule({
  declarations: [
    EmployeeComponent,
    OrganizationDetailComponent,
    AddressNewComponent,
    PersonalInfoComponent,
    PersonalAddressesComponent,
    FamilyDetailComponent,
    SideBarComponent,
    AddressViewComponent,
    FamilyDetailViewComponent,
    EmergencycontactViewComponent,
    PageTitleComponent


  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    EmployeeRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DemoNgZorroAntdModule,
    AngularFileUploaderModule,
    CustomFormsControlsModule,

  ],

  exports: [EmployeeComponent,SideBarComponent],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
})
export class EmployeeModule {}
