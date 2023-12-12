/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { getCountries, getCountryTeleCodes, getStates } from './data-source';

@Injectable({
  providedIn: 'root'
})
export class LocationPhoneService {

  constructor(
    private readonly _httpClient: HttpClient
  ) { 
  }

  getListofCountries(){
    return of(getCountries())
  }

  getListofStates(country: string){

    return of(getStates(country))

  }

  getCountriesPhoneCode(){
    return of(getCountryTeleCodes())
  }
}
