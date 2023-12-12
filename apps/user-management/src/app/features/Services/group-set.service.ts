import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from "../../../environments/environment";
import { ResponseDTO } from '../../models/ResponseDTO';
import { ErrHandleService } from '../../shared/services/error-handle.service';
import { GroupSetModel } from '../Models/group-set.model';

@Injectable({
    providedIn: 'root',
  })
  export class GroupSetService {
    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    path = `${environment.apiUrl}/GroupSet`;

    constructor(private http: HttpClient, private errHandler: ErrHandleService) {}

    createGroup(groupSet: GroupSetModel): Observable<ResponseDTO<any>> {
        return this.http.post<ResponseDTO<any>>(this.path, groupSet, this.httpOptions).pipe(
          catchError(this.errHandler.formatErrors)
        );
      }
    
}