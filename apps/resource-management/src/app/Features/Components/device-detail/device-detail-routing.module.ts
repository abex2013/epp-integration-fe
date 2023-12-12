import { NgModule } from '@angular/core';
import { AddEditDeviceDetailComponent } from './add-edit-device-detail/add-edit-device-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { DeviceDetailComponent } from './device-detail.component';

const routes: Routes = [
  {path: '', component: DeviceDetailComponent},
  {path: 'add', component: AddEditDeviceDetailComponent },
  {path: 'edit/:id', component: AddEditDeviceDetailComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DeviceDetailRoutingModule { }
