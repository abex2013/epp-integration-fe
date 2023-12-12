import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/applicant-tracking/src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { FieldOfStudyModel } from '../../models/education/field-of-study.model';
import { ResponseDTO } from '../../models/ResponseDTO';
import { ErrHandleService } from '../../shared/services/error-handle.service';

@Injectable({
  providedIn: 'root',
})
export class FieldOfStudyService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  path = `${environment.apiUrl}/lufieldOfStudy`;
  
  constructor(private http: HttpClient, 
    private errHandler: ErrHandleService) {}

  get(): Observable<ResponseDTO<[FieldOfStudyModel]>> {
    return this.http.get<ResponseDTO<[FieldOfStudyModel]>>(this.path).pipe(
      catchError(this.errHandler.formatErrors)
    );
  }
 
 private log(data: any) {
   // console.log(data);
  }
}
