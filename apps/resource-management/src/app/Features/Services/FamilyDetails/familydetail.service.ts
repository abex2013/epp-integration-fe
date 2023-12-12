import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { FamilyDetails } from '../../Models/FamilyDetail/mock-family-details';

@Injectable({
  providedIn: 'root'
})
export class FamilydetailService {
  constructor( private readonly _httpClient: HttpClient
    ) {}
  getListofEmpIds(){

    return of(FamilyDetails);

  }
}
