import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryResponse } from '../model/category-model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private _http = inject(HttpClient);
  private baseUrl = 'http://localhost:9090/api/categories';

  getCategories(): Observable<CategoryResponse> {
    return this._http.get<CategoryResponse>(this.baseUrl);
  }
}
