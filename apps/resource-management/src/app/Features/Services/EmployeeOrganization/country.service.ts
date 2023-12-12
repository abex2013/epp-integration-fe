import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IDutyBranch } from '../../Models/EmployeeOrganization/DutyBranch';
import { Observable } from 'rxjs';
import { CountryModel } from '../../Models/EmployeeOrganization/ContryModel';
import { DutyBranchModel } from '../../Models/EmployeeOrganization/DutyBranchModel';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { 

  }

  loadCountries(): Observable<CountryModel[] | any> {
    return this.http.get(this.baseUrl + '/country/GetAllCountries')
  }

  loadDutyBranch(country:string): Observable<DutyBranchModel[] | any> {
    return this.http.get<IDutyBranch[]>(this.baseUrl + '/dutybranch/GetDutyBranchByCountryId/' + country)
  }
}
