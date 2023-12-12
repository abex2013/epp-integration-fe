
import { ApiService } from '../models/apiService';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CountryState } from '../models/get/CountryState';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService  {
stateUrl ='https://countriesnow.space/api/v0.1/countries/states';
  constructor(protected _httpClient: HttpClient ) {
   
  }
  getAll():Observable<Array<CountryState>>{
    return this._httpClient.get<CountryState[]>(this.stateUrl);
  }

}
