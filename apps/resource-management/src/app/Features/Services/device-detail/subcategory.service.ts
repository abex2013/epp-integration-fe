import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { SubCategory } from '../../Models/device-detail/subcategory';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  baseUrl = environment.apiUrl;
  subCategories: SubCategory[] = [];

  constructor(private http: HttpClient) { }

  loadSubCategories(): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(this.baseUrl + 'SubCategory')
  }

  getByCategory(id: string): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(this.baseUrl + "SubCategory?id="+id);
  }
}
