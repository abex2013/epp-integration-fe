import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class AreaOfInterestLookUpService {
  
  constructor(private http: HttpClient) {}
  private formatErrors(error: any) {
    return throwError(error.error);
  }

  getAllPositions(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/LUPositionToApply/LUPositionToApplyGetAll`)
      .pipe(catchError(this.formatErrors));
  }
  getAllProficencyLevel(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/LUProficiencyLevel/GetAll`)
      .pipe(catchError(this.formatErrors));
  }

  getSkillsByPosition(id?:any): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/LUPositionSkillSet/GetAll?guid=${id}`)
      .pipe(catchError(this.formatErrors));
  }

  appliedToPositions() {
    return of([
      {
        id: 1,
        positionId: 1
      },
      {
        id: 2,
        positionId: 6
      }
    ]);
  }

  getSkills() {
    return of([
      {
        id: 1,
        name: 'test'
      },
      {
        id: 2,
        name: 'abcd'
      },
      {
        id: 4,
        name: 'added new'
      },
      {
        id: 3,
        name: 'skillSetTesting'
      }
    ]);
  }


}
