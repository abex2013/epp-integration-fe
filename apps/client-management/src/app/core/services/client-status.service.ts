import { ApiService, ClientStatus } from '..';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ClientStatusService extends ApiService<ClientStatus>{

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
   }
   getResourceUrl(): string {

    return 'ClientStatus';
  }
}
