import { ApiService } from '../models/apiService';
import { Client } from '../models/get/client';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchclientsService extends ApiService<Client> {
  constructor(protected httpClient: HttpClient ) {
    super(httpClient);
  }
  getResourceUrl(): string {
   return 'ClientDetails';
  }

}
