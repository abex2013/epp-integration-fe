import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Category } from '../../Models/device-detail/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseUrl = environment.apiUrl;
  categories : Category[] = [];

  constructor(private http: HttpClient) { }

  loadCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.baseUrl + "Category");
  }
}
