import { ApiService } from 'apps/project-management/src/app/core/models/apiService';
import { CompanyContact } from './../models/get/company-contact';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyContactService extends ApiService<CompanyContact> {
  CompanyAPI="http://localhost:14696/api/v1/Employees";

  constructor(protected httpClient: HttpClient ) {
    super(httpClient);
  }

  getResourceUrl(): string {

    return 'CompanyContact';
  }
  getNameRole()
  {
    this.httpClient.get<CompanyContact>(this.CompanyAPI);
  }
}
