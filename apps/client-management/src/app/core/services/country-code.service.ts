import { CountryCode, Data } from '../models/get/country-code';

import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { countryPhoneCodes } from '../../shared/Data/dummy';

@Injectable({
  providedIn: 'root'
})
export class CountryCodeService  {

  countryCodes: CountryCode = {} as CountryCode

  CountryAPI="https://countriesnow.space/api/v0.1/countries/codes";

  constructor(private http:HttpClient) {
    this.countryCodes.data = countryPhoneCodes.map((x: any)=>{
      return {
        name: x.name,
        code: '',
        dial_code:x.phoneCode
      } as Data
    })


   }
   private getCountryCode()
   {
     return this.http.get<CountryCode>(this.CountryAPI);

   }

   getPhonePrefices(){
     return this.countryCodes.data.map((country: Data)=>{
      return { value:country.dial_code, label: '(' + country.dial_code + ') ' + country.name }
     })
   }
}
