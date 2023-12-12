import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { areaOfInterestModel } from '../../models/applicant/areaOfInterest/area-of-interest.model';

@Injectable({ providedIn: 'root' })
export class AreasOfInterestService {
  header = new HttpHeaders({ 'Content-Type': 'application/json' });
  routerInfo = '/application/area-Of-Interests';

  private dataSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  data: Observable<boolean> = this.dataSource.asObservable();

  constructor(private http: HttpClient) {}

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  getAllApplicantAreaOfInterest(params: any): Observable<any> {
    return this.http
      .get<any>(`${environment.apiUrl}/ApplicantAreaOfInterest/GetAll`,  {params})
      .pipe(catchError(this.formatErrors));
  }

  getApplicantAreaOfInterestByID(guid: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/ApplicantAreaOfInterest?guid=${guid}`)
      .pipe(catchError(this.formatErrors));
  }

  updateApplicantAreaOfInterest(body: areaOfInterestModel): Observable<any> {
    return this.http.put(`${environment.apiUrl}/ApplicantAreaOfInterest/ApplicantAreaOfInterest`, body, {headers:this.header}
      )
      .pipe(catchError(this.formatErrors));
  }

  createApplicantAreaOfInterest(body: areaOfInterestModel): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}/ApplicantAreaOfInterest/applicantAreaOfInterestToApply`, body, {headers:this.header})
      .pipe(catchError(this.formatErrors));
  }

  deleteApplicantAreaOfInterest(id: string): Observable<any> {
    return this.http
      .delete(
        `${environment.apiUrl}/ApplicantAreaOfInterest/DeleteApplicantAreaOfInterst?id=${id}`)
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
