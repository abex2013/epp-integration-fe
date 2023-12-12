/* eslint-disable @typescript-eslint/no-empty-function */

import { Address } from '../../Models/address.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDto } from '../../Models/response-dto.model';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  url = 'http://localhost:14696/api/v1/PersonalAddress';

  addressIn = {
    Guid: '6fa85f64-5717-4562-b3fc-2c963f66afa6',
    IsActive: true,
    IsDeleted: true,
    CreatedDate: '2021-11-18T16:12:03.065Z',
    CreatedbyUserGuid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    PhoneNumber: 'string',
    Country: 'string',
    StateRegionProvice: 'string',
    City: 'string',
    SubCityZone: 'string',
    Woreda: 'string',
    HouseNumber: 'string',
    PostalCode: 0,
  };

  constructor(private readonly _httpClient: HttpClient) {}

  add(address: Address): Observable<ResponseDto<Address>> {
    console.log('service');
    return this._httpClient.post<ResponseDto<Address>>(this.url, address);
  }
}
