import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddClientComponent } from './add-client/add-client.component';
import { ClientsRoutingModule } from './clients-routing.module';
import { CommonModule } from '@angular/common';
import { CompanyContactsFormComponent } from './add-client/company-contacts-form/company-contacts-form.component';
import { ContactsFormComponent } from './add-client/contacts-form/contacts-form.component';
import { DetailsFormComponent } from './add-client/details-form/details-form.component';
import { LoacationsFormComponent } from './add-client/loacations-form/loacations-form.component';
import { NgModule } from '@angular/core';
import { NgZorroModule } from '@exec-epp/ng-zorro';
import { OperatingAddressFormComponent } from './add-client/loacations-form/operating-address-form/operating-address-form.component';
import { BillingAddressFormComponent } from './add-client/loacations-form/billing-address-form/billing-address-form.component';

import { SharedModule } from '../shared/shared.module';
import { SortPipe } from '../core/pipes/sort.pipe';
import { ViewClientsComponent } from './view-clients/view-clients.component';

@NgModule({
  declarations: [
    ViewClientsComponent,
    CompanyContactsFormComponent,
    ContactsFormComponent,
    DetailsFormComponent,
    LoacationsFormComponent,
    AddClientComponent,
    OperatingAddressFormComponent,
    BillingAddressFormComponent,
    SortPipe
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    ClientsRoutingModule,
    CommonModule,
    ClientsRoutingModule,
    NgZorroModule
  ],
  exports: [],
})
export class ClientsModule {}
