import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'apps/timesheet/src/environments/environment';
import { Employee } from '../../models/employee';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  loadCurrentUser() {
    return this.http.get<Employee[]>(this.baseUrl + "employees");
  }
}
