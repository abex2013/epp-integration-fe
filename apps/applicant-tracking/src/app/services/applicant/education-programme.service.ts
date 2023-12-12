import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/applicant-tracking/src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { EducationProgramModel } from '../../models/education/education-programme.model';
import { ErrHandleService } from '../../shared/services/error-handle.service';

@Injectable({
  providedIn: 'root',
})
export class EducationProgrammeService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  path = `${environment.apiUrl}/LUEducationProgramme`;
  
  constructor(private http: HttpClient, 
    private errHandler: ErrHandleService) {}

  get(): Observable<[EducationProgramModel]> {
    return this.http.get<[EducationProgramModel]>(this.path).pipe(
      catchError(this.errHandler.formatErrors)
    );
  }
 
 private log(data: any) {
    //console.log(data);
  }
}
