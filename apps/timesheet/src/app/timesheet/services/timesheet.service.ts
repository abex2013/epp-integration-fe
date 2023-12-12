import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'apps/timesheet/src/environments/environment';
import {
  ApprovalEntity,
  TimeEntriesResponse,
  TimeEntry,
  TimeEntryResponse,
  Timesheet,
  TimesheetApproval,
  TimesheetApprovalResponse,
  TimesheetConfigResponse,
  TimesheetResponse,
} from '../../models/timesheetModels';
import { Project } from '../../models/project';
import { Client } from '../../models/client';
import { DayAndDateService } from './day-and-date.service';
import { PaginatedResult, Pagination } from '../../models/PaginatedResult';

@Injectable({
  providedIn: 'root',
})
export class TimesheetService {
  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private dayAndDateService: DayAndDateService
  ) {}

  //#region timesheet and timeEntry

  getTimeSheet(userId: string, date?: Date) {
    let fromDate;

    if (date) {
      fromDate = this.dayAndDateService.getWeeksFirstDate(date);
    } else {
      fromDate = this.dayAndDateService.getWeeksFirstDate(new Date());
    }
    fromDate.setHours(3, 0, 0, 0);

    let params = new HttpParams();

    params = params.append('employeeId', userId);
    params = params.append('date', fromDate.toISOString());

    let response = this.http.get<TimesheetResponse>(
      this.baseUrl + 'Timesheets',
      { observe: 'response', params: params }
    );

    return response.pipe(map((r) => r.body?.Data));
  }

  getTimeEntry(timeEntryId: string) {
    let params = new HttpParams();

    params = params.append('id', timeEntryId);

    let response = this.http.get<TimeEntryResponse>(
      this.baseUrl + 'timeentries',
      { observe: 'response', params: params }
    );

    return response.pipe(map((r) => r.body?.Data));
  }

  getTimeEntries(timesheetId: string, date?: Date, projectId?: string) {
    let params = new HttpParams();

    params = params.append('timesheetId', timesheetId);

    if (date) {
      date = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        3,
        0,
        0,
        0
      );
      params = params.append('date', date.toISOString());
    }

    if (projectId) {
      params = params.append('projectId', projectId);
    }

    let response = this.http.get<TimeEntriesResponse>(
      this.baseUrl + 'timeentries',
      { observe: 'response', params: params }
    );

    return response.pipe(map((r) => r.body?.Data));
  }

  addTimeEntry(employeeId: string, timeEntry: TimeEntry) {
    const headers = { 'content-type': 'application/json' };

    let params = new HttpParams();

    params = params.append('employeeId', employeeId);

    return this.http.post<any>(this.baseUrl + 'timeentries', timeEntry, {
      headers: headers,
      params: params,
    });
  }

  addTimeEntryForRangeOfDates(employeeId: string, timeEntries: TimeEntry[]) {
    const headers = { 'content-type': 'application/json' };

    let params = new HttpParams();

    params = params.append('employeeId', employeeId);

    return this.http.post<any>(
      this.baseUrl + 'TimeEntriesForRange',
      timeEntries,
      { headers: headers, params: params }
    );
  }

  updateTimeEntry(timeEntry: TimeEntry) {
    const headers = { 'content-type': 'application/json' };

    return this.http.put<TimeEntryResponse>(
      this.baseUrl + 'timeentries',
      timeEntry,
      { headers: headers }
    );
  }

  deleteTimeEntry(timeEntryId: string): Observable<unknown> {
    let params = new HttpParams();

    params = params.set('timeEntryId', timeEntryId);

    return this.http.delete(this.baseUrl + 'DeleteTimeEntry', { params });
  }

  //#endregion

  //#region Time sheet approval

  getTimeSheetApproval(timeSheetId: string) {
    let params = new HttpParams();

    params = params.append('timesheetGuid', timeSheetId);

    let response = this.http.get<TimesheetApprovalResponse>(
      this.baseUrl + 'TimesheetAproval',
      { observe: 'response', params: params }
    );

    return response.pipe(map((r) => r.body?.Data));
  }

  addTimeSheetApproval(timeSheetId: string) {
    const headers = { 'content-type': 'application/json' };

    let params = new HttpParams();

    params = params.append('timesheetGuid', timeSheetId);

    let response = this.http.post<TimesheetApprovalResponse>(
      this.baseUrl + 'TimesheetAproval',
      null,
      { headers: headers, params: params }
    );

    return response.pipe(map((r) => r.Data));
  }

  //#endregion

  //#region Timesheet Configuration

  getTimeSheetConfiguration() {
    let response = this.http.get<TimesheetConfigResponse>(
      this.baseUrl + 'TimeSheetConfig'
    );

    return response.pipe(map((r) => r.Data));
  }

  //#endregion

  //#region client and poject from mock server

  getClients(clientIds?: string[]) {
    if (clientIds) {
      let params = new HttpParams();

      for (const index in clientIds) {
        params = params.append('id', clientIds[index]);
      }

      let response = this.http.get<Client[]>('http://localhost:3000/clients', {
        observe: 'response',
        params: params,
      });

      return response.pipe(map((r) => r.body));
    } else {
      return this.http.get<Client[]>('http://localhost:3000/clients');
    }
  }

  getClient(clientId: string) {
    let params = new HttpParams();

    params = params.append('id', clientId);

    let response = this.http.get<Client[]>('http://localhost:3000/clients', {
      observe: 'response',
      params: params,
    });

    return response.pipe(map((r) => r.body));
  }

  getProjects(userId: string, clientId?: string) {
    let params = new HttpParams();

    params = params.append('employeeId', userId);

    if (clientId) {
      params = params.append('clientId', clientId);
    }

    let response = this.http.get<Project[]>('http://localhost:3000/projects', {
      observe: 'response',
      params: params,
    });

    return response.pipe(map((r) => r.body));
  }

  getProject(projectId: string) {
    let params = new HttpParams();

    params = params.append('id', projectId);

    let response = this.http.get<Project[]>('http://localhost:3000/projects', {
      observe: 'response',
      params: params,
    });

    return response.pipe(map((r) => r.body));
  }
  //#endregion

getTimesheetSubmissions(
  pageIndex: number,
  pageSize: number,
  sortField: string | null,
  sortOrder: string | null,
  filters: Array<{ key: string; value: string[] }>,
  search?:string
):Observable<PaginatedResult< TimesheetApproval[]>>  {
  let params = new HttpParams()
    .append('pageIndex', `${pageIndex}`)
    .append('pageSize', `${pageSize}`)
    .append('sortField', `${sortField}`)
    .append('sortOrder', `${sortOrder}`)
    .append('search',`${search}`);
  filters.forEach(filter => {
    filter.value.forEach(value => {
      params = params.append(filter.key, value);
    });
  });
   let paginatedResult: PaginatedResult< TimesheetApproval[]> = {
     data: [] as  TimesheetApproval[],
     pagination: {} as Pagination
  };
  return this.http.get(`${this.baseUrl}usertimesheetSubmissions?` +params.toString())
       .pipe(   
         map((response:any) => { 
           paginatedResult= {
             data:response.Data,
             pagination:{pageIndex:response.PageIndex,
               totalPage:response.TotalPage,
               pageSize:response.PageSize,
               totalRecord:response.TotalRecord}
          };
          return paginatedResult;      
         })
       );

        }
  getTimesheetApprovalPagination(
    pageindex: number,
    pageSize: number,
    searchKey?: string,
    status?:string
  ): Observable<PaginatedResult<TimesheetApproval[]>> {
    const params = new HttpParams()
      .set('pageindex', pageindex.toString())
      .set('pageSize', pageSize.toString())
      .set('searchKey', searchKey ? searchKey : '');

    let paginatedResult: PaginatedResult<TimesheetApproval[]> = {
      data: [] as TimesheetApproval[],
      pagination: {} as Pagination,
    };
    return this.http.get(`${this.baseUrl}approve?`+ params.toString()).pipe(
      map((response: any) => {
        paginatedResult = {
          data: response.Data,
          pagination: {
            pageIndex: response.PageIndex,
            totalPage: response.TotalPage,
            pageSize: response.PageSize,
            totalRecord: response.TotalRecord,
          },
        };
        return paginatedResult;
      })
    );

  }
}
