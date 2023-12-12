import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AntdFormModule } from './forms/antd-form.module';
import { CustomFormModule } from './forms/custom-form.module';
@NgModule({
  declarations: [],
  imports: [CommonModule, AntdFormModule, CustomFormModule],
  exports: [CommonModule, AntdFormModule, CustomFormModule],
})
export class SharedModule {}
