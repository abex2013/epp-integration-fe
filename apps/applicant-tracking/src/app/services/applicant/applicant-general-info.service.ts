import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PersonalInfoModel } from '../../models/applicant/personal-info.model';

// @Injectable({
//   providedIn: 'root',
// })
@Injectable({providedIn: 'root'})
export class ApplicantGeneralInfoService {
  header = new HttpHeaders({ 'Content-Type': 'application/json' });
  routerInfo = '/application/personal-information';

  private dataSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  data: Observable<boolean> = this.dataSource.asObservable();
  
  constructor(private http: HttpClient) {}
  private formatErrors(error: any) {
    return throwError(error.error);
  }

  updatePersonalInfo(body: PersonalInfoModel): Observable<any> {
    return this.http
      .put(`${environment.apiUrl}/Applicant/ApplicantGeneralInfo`, JSON.stringify(body), {
        headers: this.header,
      })
      .pipe(catchError(this.formatErrors));
  }

  getPersonalInfo(
    params: any
  ): Observable<any> {
    return this.http
      .get<any>(`${environment.apiUrl}/Applicant`, { params })
      .pipe(catchError(this.formatErrors));
  }
  setRoutInfo(path: string) {
    this.routerInfo = path;
  }
  getRoutInfo() {
    return this.routerInfo;
  }
  hasData(value: boolean) {
    this.dataSource.next(value);
  }
}
