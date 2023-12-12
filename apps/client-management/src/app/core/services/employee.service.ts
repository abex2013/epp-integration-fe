import { ApiService } from '..';
import { Employee } from './../models/get/employee';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends ApiService<Employee> {

  constructor(protected httpClient: HttpClient ) {
    super(httpClient);
  }

  getResourceUrl(): string {

    return 'Employee/GetEmployeeSelection';
  }

  

}





