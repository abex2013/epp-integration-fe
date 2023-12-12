import { AllDataResponse } from '../models/get/AllDataResponse';
import { ApiService } from '../models/apiService';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OperatingAddress } from '../models/get/operating-address';
import { ResponseMessage } from '../models/get/response-message';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OperationalAddressService extends ApiService<OperatingAddress> {

  constructor(protected httpClient: HttpClient ) {
    super(httpClient);
  }

  getResourceUrl(): string {

    return 'OperatingAddress';
  }


}
