import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductApiResponse } from '../model/product-model';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {

  private baseUrl = 'http://localhost:9090/api/products';

  constructor(private http: HttpClient) {}

  // Function to fetch products
  fetchProducts(page: number = 1, limit: number = 10): Observable<ProductApiResponse> {
    return this.http.get<ProductApiResponse>(`${this.baseUrl}?page=${page}&limit=${limit}`);
  }

  // Function to fetch a single product
  fetchProductById(id: string) {
    return this.http.get<ProductApiResponse>(`${this.baseUrl}/${id}`);
  }
}
