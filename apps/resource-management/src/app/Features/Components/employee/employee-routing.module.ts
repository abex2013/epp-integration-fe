import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { FamilyDetailComponent } from './family-detail/family-detail.component';
import { NgModule } from '@angular/core';
import { OrganizationDetailComponent } from './organization-detail/organization-detail.component';
import { PersonalAddressesComponent } from './personal-addresses/personal-addresses.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { AddressViewComponent } from './address-view/address-view.component';
import { FamilyDetailViewComponent } from './family-detail-view/family-detail-view.component';
import { EmergencycontactViewComponent } from './emergencycontact-view/emergencycontact-view.component';

const routes: Routes = [
  { path: 'employee/add-employee', component: EmployeeComponent },

  {
    path: 'employee/add-employee/personal-info',
    component: PersonalInfoComponent,
  },
  {
    path: 'employee/add-employee/Organization-Detail',
    component: OrganizationDetailComponent,
  },
  {
    path: 'employee/add-employee/personal-address',
    component: PersonalAddressesComponent,
  },

  {
    path: 'employee/add-employee/Organization-Detail',
    component: OrganizationDetailComponent,
  },

  {path: 'employee/add-employee/address-view',
  component: AddressViewComponent,
},
  {
    path: 'employee/add-employee/family-detail',
    component: FamilyDetailComponent,
  },
  {
    path: 'employee/add-employee/family-detail-view',
    component: FamilyDetailViewComponent,
  },

  {
    path: 'employee/add-employee/emergencycontacts-view',
    component: EmergencycontactViewComponent,
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
