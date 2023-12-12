import { ClientContact } from './../models/get/client-contact';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ApiService } from '../models/apiService';

@Injectable({
  providedIn: 'root'
})
export class ClientContactService extends ApiService<ClientContact> {

  constructor(protected httpClient: HttpClient ) {
    super(httpClient);
  }

  getResourceUrl(): string {

    return 'ClientContact';
  }
}
