import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginatedResult, Pagination } from '.';

import{AllDataResponse} from './get/AllDataResponse';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseMessage } from './get/response-message';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export abstract class ApiService<T> {
  public readonly APIUrl = environment.baseApiUrl + this.getResourceUrl();

  constructor(protected httpClient: HttpClient) {
  }

  abstract getResourceUrl(): string;

  getAll(): Observable<Array<T>> {

    return this.httpClient.get<T[]>(this.APIUrl);

  }
  getSearch(optional: any) {

    return this.httpClient.get<T[]>(this.APIUrl + '/search/' + optional);

  }

  getList(params: any): Observable<any[]> {
    return this.httpClient.get<any[]>(this.APIUrl + "?" + params.toString())

  }

  get(id: string | number): Observable<[T]> {
    return this.httpClient.get<[T]>(this.APIUrl + "/" + id);
  }

  getById(id: string): Observable<T> {
    return this.httpClient.get<T>(this.APIUrl + "/" + id);
  }


  post(resource: any) {
    return this.httpClient.post(this.APIUrl, resource);
  }

  delete(id: string | number) {
    return this.httpClient.delete(this.APIUrl + "/" + id);
  }

  update(resource: T) {
    return this.httpClient.put(`/${this.APIUrl}`, resource)

  }

  getWithPagnationResut(pageindex: number, pageSize: number, searchKey?: string): Observable<PaginatedResult<T[]>> {
    const params = new HttpParams()
      .set('pageindex', pageindex.toString())
      .set('pageSize', pageSize.toString())
      .set('searchKey', searchKey ? searchKey : "")

    let paginatedResult: PaginatedResult<T[]> = {
      data: [] as T[],
      pagination: {} as Pagination
    };
    return this.get("Predicated?" + params.toString())
      .pipe(
        map((response: any) => {
          paginatedResult = {
            data: response.Data,
            pagination: {
              pageIndex: response.PageIndex,
              totalPage: response.TotalPage,
              pageSize: response.PageSize,
              totalRecord: response.TotalRecord
            }
          };
          return paginatedResult;
        })
      );
  }

getData(): Observable<AllDataResponse<T[]>> {


    let AllDataResponse: AllDataResponse<T[]> = {
       responseStatus: {} as ResponseMessage,
       data: [] as T[]
    };
    return this.get('')
      .pipe(
        map((response: any) => {
          AllDataResponse = {
            data: response.Data,
            responseStatus: {
                   ResponseStatus: response.ResponseStatus,
                   Message: response.Message,
                   Ex: response.Ex
            }
          };
          return AllDataResponse;
        })
      );
  }

}
