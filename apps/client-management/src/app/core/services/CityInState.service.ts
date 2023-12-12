
import { ApiService } from '../models/apiService';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CountryCity } from '../models/get/CoountryCity';

@Injectable({
  providedIn: 'root'
})
export class CityInStateService  {
cityInStateUrl='https://countriesnow.space/api/v0.1/countries/state/cities';
  constructor(protected httpClient: HttpClient ) {
    
  }


  post(resource:any) {
    return this.httpClient.post(this.cityInStateUrl , resource);
  }


}