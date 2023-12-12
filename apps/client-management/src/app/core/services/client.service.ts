import { AddClientStateService, ApiService, Client, PaginatedResult } from '..';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends ApiService<Client> {
  private fristPagantionClientsSource = new BehaviorSubject<
    PaginatedResult<Client[]>
  >({} as PaginatedResult<Client[]>);
  fristPagantionClients$ = this.fristPagantionClientsSource.asObservable();

  constructor(
    protected httpClient: HttpClient,
    private notification: NzNotificationService,
    private addClientStateService: AddClientStateService
  ) {
    super(httpClient);
  }

  getFirsttPageValue() {
    return this.fristPagantionClientsSource.value;
  }

  setFristPageOfClients(data: PaginatedResult<Client[]>) {
    this.fristPagantionClientsSource.next(data);
  }

  getResourceUrl(): string {
    return 'ClientDetails';
  }

  addClient() {
    this.post(this.addClientStateService.addClientData).subscribe(
     
      (response: any) => {
        console.log("this.addClientStateService.addClientData")
        console.log(this.addClientStateService.addClientData)
        console.log('this.addClientStateService.addClientData')
        if (response.ResponseStatus.toString().toLowerCase() == 'error') {
          this.notification.error(
            'Client not added',
            'Please try again letter'
          );
          this.addClientStateService.restAddClientState();
        } else {
          this.notification.success('Client added successfully', '');
          this.addClientStateService.restAddClientState();
        }
      },
      () => {
        this.notification.error('Client  not added', 'Please try again letter');
        this.addClientStateService.restAddClientState();
      }
    );
  }
}
