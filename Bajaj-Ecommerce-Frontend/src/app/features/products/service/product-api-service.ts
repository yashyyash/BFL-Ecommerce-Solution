import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductApiResponse, SingleProductResponse } from '../model/product-model';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {

  // Use inject() instead of constructor injection
  private http = inject(HttpClient);

  private baseUrl = 'http://localhost:9090/api/products';

  // Function to fetch products
  // fetchProducts(page: number = 1, limit: number = 10): Observable<ProductApiResponse> {
  //   return this.http.get<ProductApiResponse>(`${this.baseUrl}?page=${page}&limit=${limit}`);
  // }

  fetchProducts(page: number = 1, limit: number = 8, category?: string) {
    let url = `${this.baseUrl}?page=${page}&limit=${limit}`;
    if (category) {
      url += `&category=${category}`;
    }
    return this.http.get<{ data: Product[] }>(url);
  }

  // Function to fetch a single product
  fetchProductById(id: string) {
    // return this.http.get<SingleProductResponse>(`${this.baseUrl}/${id}`);
    return this.http.get<SingleProductResponse>(`${this.baseUrl}/${id}`);
  }

}
