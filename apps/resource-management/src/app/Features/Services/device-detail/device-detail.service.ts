import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableLike } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DeviceDetail } from '../../Models/device-detail/devicedetail';
import { ResponseDTO, ResponseDto } from '../../Models/response-dto.model';
import { Pagination } from '../../Models/device-detail/pagination';


@Injectable({
  providedIn: 'root'
})
export class DeviceDetailService {
  baseUrl = environment.apiUrl;
  deviceDetails:DeviceDetail[] = [];

  constructor(private http: HttpClient) { }

  // getDeviceDetails(): Observable<DeviceDetail[]> {
  //   return this.http.get<DeviceDetail[]>(this.baseUrl + "DeviceDetails");
  // }

  getDeviceDetail(id: string): Observable<ResponseDTO<DeviceDetail>> {
    return this.http.get<ResponseDTO<DeviceDetail>>(this.baseUrl + "DeviceDetails/Get?id="+ id);
  }

  getDeviceDetails(index: number): Observable<Pagination> {
    index = index ?? 1;
    return this.http.get<Pagination>(this.baseUrl + "DeviceDetails?pageindex="+index);
  }

  addDeviceDetail(deviceDetail: DeviceDetail): Observable<ResponseDto<DeviceDetail>> {
    return this.http.post<ResponseDto<DeviceDetail>>(this.baseUrl + "DeviceDetails", deviceDetail);
  }

  updateDeviceDetail(deviceDetail: DeviceDetail, id: string): Observable<ResponseDto<DeviceDetail>> {
    deviceDetail.Guid = id;
    return this.http.put<ResponseDto<DeviceDetail>>(this.baseUrl + "DeviceDetails", deviceDetail);
  }

  deleteDeviceDetail(id: string): Observable<ResponseDto<DeviceDetail>> {
    return this.http.delete<ResponseDto<DeviceDetail>>(this.baseUrl + "DeviceDetails/?id="+ id);
  }
}
