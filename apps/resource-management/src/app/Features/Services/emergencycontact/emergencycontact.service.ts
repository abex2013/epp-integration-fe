import { BehaviorSubject, Observable } from 'rxjs';
import {
  EmergencyContact,
  EmergencyContacts,
  IEmergencyContact,
} from '../../Models/emergencycontact';
import { ResponseDTO, ResponseDto } from '../../Models/response-dto.model';

import { Address } from '../../Models/address.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmergencycontactService {
  formData: EmergencyContact = new EmergencyContact();
  list: EmergencyContact[] = [];
  private emSource = new BehaviorSubject<IEmergencyContact | null>(null);

  em$ = this.emSource.asObservable();

  constructor(private http: HttpClient) {}

  readonly baseURL = 'http://localhost:14696/api/v1/EmergencyContact';

  putEmergencycontact() {
    return this.http.put(
      `${this.baseURL}/${this.formData.guid}`,
      this.formData
    );
  }

  deleteEmergencycontact(id: number) {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  getEmergencyContact(): Observable<EmergencyContact[]> {
    return this.http.get<EmergencyContact[]>(this.baseURL);
  }

  refreshList() {
    this.http
      .get(this.baseURL)
      .toPromise()
      .then(() => this.list);
  }

  postEmergencycontact(emc: IEmergencyContact) {
    return this.http.post<IEmergencyContact>(this.baseURL, emc).subscribe(
      (response: IEmergencyContact) => {
        this.emSource.next(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  setEmergencycontactData(emc: EmergencyContact) {
    this.emSource.next(emc);
  }

  createsEmergencycontact(emc: EmergencyContact): Observable<EmergencyContact> {
    console.log(emc);
    return this.http.post<EmergencyContact>(this.baseURL, emc);
  }
  postEmergenycContact(em: IEmergencyContact) {
    return this.http.post<ResponseDTO<IEmergencyContact>>(this.baseURL, em);
  }

  createEmergencycontact(em: IEmergencyContact): Observable<IEmergencyContact> {
    return this.http.post<IEmergencyContact>(this.baseURL, em);
  }

  postEmergenycContacts(emc: EmergencyContacts) {
    return this.http.post(this.baseURL, emc);
  }
  postIEmergenycContacts(emc: IEmergencyContact) {
    return this.http.post(this.baseURL, emc);
  }

  addEmergencycontact(emc: IEmergencyContact) {
    this.setEmergencycontact(emc);
  }

  setEmergencycontact(emc: any) {
    return this.http.post(this.baseURL, emc).subscribe(
      (response: ResponseDTO<any> | any) => {
        this.emSource.next(response.data), console.log(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
