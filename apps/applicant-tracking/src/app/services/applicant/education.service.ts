import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/applicant-tracking/src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EducationModel } from '../../models/education/education.model';
import { ResponseDTO } from '../../models/ResponseDTO';
import { ErrHandleService } from '../../shared/services/error-handle.service';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  path = `${environment.apiUrl}/education`;

  private dataSource: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  data: Observable<boolean> = this.dataSource.asObservable();
  
  constructor(private http: HttpClient,
              private errHandler: ErrHandleService) {}
  
  add(education: EducationModel): Observable<ResponseDTO<any>> {
    return this.http.post<ResponseDTO<any>>(this.path, education, this.httpOptions).pipe(
      catchError(this.errHandler.formatErrors)
    );
  }
  update(body: EducationModel): Observable<ResponseDTO<any>> {
    return this.http
      .put<ResponseDTO<any>>(this.path, JSON.stringify(body), this.httpOptions)
      .pipe(catchError(this.errHandler.formatErrors));
  }

  getByApplicantId(applicantId: string): Observable<ResponseDTO<[EducationModel]>> {
    const url = `${this.path}?applicantId=${applicantId}`;
    return this.http.get<ResponseDTO<[EducationModel]>>(url).pipe(
      catchError(this.errHandler.formatErrors)
    );
  }

  getById(id: string): Observable<ResponseDTO<[EducationModel]>> {
    const url = `${this.path}?id=${id}`;
    return this.http.get<ResponseDTO<[EducationModel]>>(url).pipe(
      catchError(this.errHandler.formatErrors)
    );
  }

  delete(id: string): Observable<ResponseDTO<any>> {
    return this.http.delete<ResponseDTO<any>>(`${this.path}/${id}`, ).pipe(
      catchError(this.errHandler.formatErrors)
    );
  }

  log(data: any) {
    console.log(data);
  }

  hasData(value: boolean){
    this.dataSource.next(value);
  }
}
