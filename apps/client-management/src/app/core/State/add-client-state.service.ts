import { BehaviorSubject, Observable } from 'rxjs';
import {
  BillingAddressCreate,
  ClientContactCreate,
  ClientCreate,
  ClientDetailCreate,
  CompanyContactCreate,
  Employee,
  OperatingAddressCreate,
  StateService,
  ValidtyAddClientForms,
} from '..';

import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

const iniitalAddClientState: ClientCreate = {
  SalesPersonGuid: '',
  ClientStatusGuid: '',
  ClientName: '',
  Description: '',
  ClientContacts: [] as ClientContactCreate[],
  CompanyContacts: [] as CompanyContactCreate[],
  OperatingAddress: [] as OperatingAddressCreate[],
  BillingAddress: [] as BillingAddressCreate[],
};

@Injectable({
  providedIn: 'root',
})
export class AddClientStateService extends StateService<ClientCreate> {
  private comapanyContacts = new BehaviorSubject<Employee[]>([] as Employee[]);

  constructor() {
    super(iniitalAddClientState);
  }

  get getClientcomapanyContacts() {
    return this.comapanyContacts.getValue();
  }

  updateClientcomapanyContacts(employees: Employee[]) {
    this.comapanyContacts.next(employees);
  }

  updateAddClientDetails(clientDetail: ClientDetailCreate) {
    this.setState({
      ClientName: clientDetail.ClientName,
      SalesPersonGuid: clientDetail.SalesPersonGuid,
      ClientStatusGuid: clientDetail.ClientStatusGuid,
      Description: clientDetail.Description,
    });
  }

  restAddClientDetails() {
    this.setState({
      ClientName: '',
      SalesPersonGuid: '',
      ClientStatusGuid: '',
      Description: '',
    });
    this.comapanyContacts.next([] as Employee[]);
  }

  get addClientData(): ClientCreate {
    return this.state;
  }

  updateClientContacts(clientCotacts: ClientContactCreate[]) {
    this.setState({ ClientContacts: clientCotacts });
  }

  updateCompanyContacts(CompanyContacts: CompanyContactCreate[]) {
    this.setState({ CompanyContacts: CompanyContacts });
  }

  updateOperatingAddress(OperatingAddress: OperatingAddressCreate[]) {
    this.setState({ OperatingAddress: OperatingAddress });
  }

  updateBillingAddress(BillingAddress: BillingAddressCreate[]) {
    this.setState({ BillingAddress: BillingAddress });
  }
  restAddClientState() {
    this.setState(iniitalAddClientState);
  }

  validateAddClientFormState(): Observable<ValidtyAddClientForms> {
    // eslint-disable-next-line prefer-const
    let validtyAddClientForms: ValidtyAddClientForms = {
      clientDetailsForm: false,
      clientLocationForm: true,
      clientContactsForm: true,
      CompanyContactsForm: true,
    };

    return this.state$.pipe(
      map((res: ClientCreate) => {
        if (
          typeof res.ClientName !== 'undefined' &&
          res.ClientName !== '' &&
          typeof res.ClientStatusGuid !== 'undefined' &&
          res.ClientStatusGuid !== '' &&
          typeof res.SalesPersonGuid !== 'undefined' &&
          res.SalesPersonGuid !== ''
        )
          validtyAddClientForms.clientDetailsForm = true;
        else {
          validtyAddClientForms.clientDetailsForm = false;
        }


        return validtyAddClientForms;
      })
    );
  }
}
