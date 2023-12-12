import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/applicant-tracking/src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ErrHandleService {

    formatErrors(error:any) {
    return throwError(error);
  }

  log(data: any) {
    console.log(data);
  }
}
