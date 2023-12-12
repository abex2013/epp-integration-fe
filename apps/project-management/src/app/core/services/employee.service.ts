import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '..';
import { ApiService } from '../models/apiService';

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





