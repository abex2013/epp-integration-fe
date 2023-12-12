import { registerLocaleData } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import en from "@angular/common/locales/en";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFileUploaderModule } from "angular-file-uploader";
import { en_US, NZ_I18N } from "ng-zorro-antd/i18n";
import { DemoNgZorroAntdModule } from "../../../ng-zorro-antd.module";
import { AddressDetailGroupComponent } from "./custom-control-groups/address-detail-group/address-detail-group.component";
import { EmergencyContactDetailGroupComponent } from "./custom-control-groups/emergency-contact-detail-group/emergency-contact-detail-group.component";
import { FamilyDetailGroupComponent } from "./custom-control-groups/family-detail-group/family-detail-group.component";
import { OrganizationalDetailGroupComponent } from "./custom-control-groups/organizational-detail-group/organizational-detail-group.component";
import { EmergencyAddressDetailGroupComponent } from "./custom-control-groups/emergency-address-detail-group/emergency-address-detail-group.component";
import { PersonalDetailGroupComponent } from "./custom-control-groups/personal-details-group/personal-details-group.component";
import { CustomDatepickerComponent } from "./custom-controls/custom-datepicker/custom-datepicker.component";
import { CustomEmailMultipleComponent } from "./custom-controls/custom-email-multiple/custom-email-multiple.component";
import { CustomEmployeeDateofBirthComponent } from "./custom-controls/custom-employee-date-of-birth/custom-employee-date-of-birth.component";
import { CustomEmployeeIdNumberComponent } from "./custom-controls/custom-employee-id-number/custom-employee-id-number.component";
import { CustomFullNameComponent } from "./custom-controls/custom-full-name/custom-full-name.component";
import { CustomGenderComponent } from "./custom-controls/custom-gender/custom-gender.component";
import { CustomNationalityComponent } from "./custom-controls/custom-nationality/custom-nationality.component";
import { CustomPhoneNumberMultipleComponent } from "./custom-controls/custom-phone-multiple/custom-phone-multiple.component";
import { CustomPhoneNumberComponent } from "./custom-controls/custom-phone/custom-phone.component";
import { CustomSelectMultipleComponent } from "./custom-controls/custom-select-multiple/custom-select-multiple.component";
import { CustomSelectComponent } from "./custom-controls/custom-select/custom-select.component";
import { CustomTextBoxComponent } from "./custom-controls/custom-text-box/custom-text-box.component";
import { CustomUploadComponent } from "./custom-controls/custom-upload/custom-upload.component";
import { ExcelButtonsMultipleControlsComponent } from "./custom-buttons/excel-buttons-multiple-controls/excel-buttons-multiple-controls.component";


registerLocaleData(en);

@NgModule({
    declarations: [
        ExcelButtonsMultipleControlsComponent,
        CustomTextBoxComponent,
        CustomSelectComponent,
        CustomSelectMultipleComponent,
        CustomDatepickerComponent,
        CustomUploadComponent,
        CustomFullNameComponent,
        CustomEmployeeIdNumberComponent,
        CustomGenderComponent,
        CustomEmployeeDateofBirthComponent,
        CustomPhoneNumberComponent,
        CustomPhoneNumberMultipleComponent,
        CustomEmailMultipleComponent,
        CustomNationalityComponent,

        PersonalDetailGroupComponent,
        OrganizationalDetailGroupComponent,
        AddressDetailGroupComponent,
        EmergencyContactDetailGroupComponent,
        EmergencyAddressDetailGroupComponent,
        FamilyDetailGroupComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AngularFileUploaderModule,
        DemoNgZorroAntdModule
    ],
    providers: [{ provide: NZ_I18N, useValue: en_US }],
    exports: [
        ExcelButtonsMultipleControlsComponent,
        CustomTextBoxComponent,
        CustomSelectComponent,
        CustomSelectMultipleComponent,
        CustomSelectMultipleComponent,
        CustomDatepickerComponent,
        CustomUploadComponent,
        CustomFullNameComponent,
        CustomEmployeeIdNumberComponent,
        CustomEmployeeDateofBirthComponent,
        CustomGenderComponent,
        CustomPhoneNumberComponent,
        CustomPhoneNumberMultipleComponent,
        CustomEmailMultipleComponent,
        CustomNationalityComponent,

        PersonalDetailGroupComponent,
        OrganizationalDetailGroupComponent,
        AddressDetailGroupComponent,
        EmergencyContactDetailGroupComponent,
        EmergencyAddressDetailGroupComponent,
        FamilyDetailGroupComponent,
    ]
})
export class CustomFormsControlsModule { }
