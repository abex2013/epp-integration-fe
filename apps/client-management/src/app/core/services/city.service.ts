
import { ApiService } from '../models/apiService';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CountryCity } from '../models/get/CoountryCity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService  {
cityUrl='https://countriesnow.space/api/v0.1/countries';
  constructor(protected _httpClient: HttpClient ) {
    
  }

  getAll():Observable<Array<CountryCity>>{
    return this._httpClient.get<CountryCity[]>(this.cityUrl);
  }
  
  

}