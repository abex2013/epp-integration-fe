import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { DeviceClassification } from '../../Models/device-detail/deviceclassification';

@Injectable({
  providedIn: 'root'
})
export class DeviceClassificationService {
  baseUrl = environment.apiUrl;
  deviceClassifications: DeviceClassification[] = [];

  constructor(private http: HttpClient) { }
  loadDeviceClassifications(): Observable<DeviceClassification[]> {
    return this.http.get<DeviceClassification[]>(this.baseUrl + 'DeviceClassification');
  }
}
