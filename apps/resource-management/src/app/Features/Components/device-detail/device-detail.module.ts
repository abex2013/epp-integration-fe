import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeviceDetailComponent } from './device-detail.component';
import { AddEditDeviceDetailComponent } from './add-edit-device-detail/add-edit-device-detail.component';
import { DeviceDetailRoutingModule } from './device-detail-routing.module';
import { DemoNgZorroAntdModule } from '../../../ng-zorro-antd.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DeviceDetailComponent,
    AddEditDeviceDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DeviceDetailRoutingModule,
    DemoNgZorroAntdModule
  ]
})
export class DeviceDetailModule { }
