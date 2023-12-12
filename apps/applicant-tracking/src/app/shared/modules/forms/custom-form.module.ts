import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputComponent } from '../../components/forms/input/input.component';
import { ButtonComponent } from '../../components/forms/button/button.component';
import { PhoneInputComponent } from '../../components/forms/phone-input/phone-input.component';
import { CountrySelectorComponent } from '../../components/forms/country-selector/country-selector.component';
import { DatePickerComponent } from '../../components/forms/date-picker/date-picker.component';
import { UploaderComponent } from '../../components/forms/uploader/uploader.component';
import { AvatarComponent } from '../../components/forms/avatar/avatar.component';
import { SelectComponent } from '../../components/forms/select/select.component';
import { CheckBoxComponent } from '../../components/forms/checkbox/checkbox.component';
import { TabComponent } from '../../components/forms/tab/tab.component';
import { AntdFormModule } from './antd-form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    PhoneInputComponent,
    CountrySelectorComponent,
    DatePickerComponent,
    UploaderComponent,
    AvatarComponent,
    SelectComponent,
    CheckBoxComponent,
    TabComponent
  ],
  imports: [CommonModule, AntdFormModule, FormsModule, ReactiveFormsModule],
  exports: [
    InputComponent,
    ButtonComponent,
    PhoneInputComponent,
    CountrySelectorComponent,
    DatePickerComponent,
    UploaderComponent,
    AvatarComponent,
    SelectComponent,
    CheckBoxComponent,
    TabComponent
  ],
})
export class CustomFormModule {}
