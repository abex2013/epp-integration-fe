import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Result } from 'postcss';

@Injectable({
  providedIn: 'root'
})
export class EmpphotoService {

  constructor(private http: HttpClient) {

   }

   public uploadEmployeePhoto(formData : FormData) {

      const httpOptions = {
        headers: new HttpHeaders({
          'Accept': 'application/json'
        })
      };

    this.http.post("http://localhost:14696/api/v1/EmployeePhoto", formData,httpOptions).subscribe(data => {
      console.log(data);
    }
    );
   }

}
