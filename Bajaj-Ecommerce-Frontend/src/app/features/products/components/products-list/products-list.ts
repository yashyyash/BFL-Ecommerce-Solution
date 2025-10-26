import { Component, OnInit, inject } from '@angular/core';
import { ProductApiService } from '../../service/product-api-service';
import { Product } from '../../model/product-model';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.html',
  styleUrls: ['./products-list.css'],
  standalone: true,
  imports: [
    CommonModule, // Provides NgFor, NgIf
    DecimalPipe,  // Provides number pipe
  ],
})
export class ProductsList implements OnInit {
  // Inject service using function injection
  private _productApi = inject(ProductApiService);

  products: Product[] = [];

  // Pagination
  currentPage: number = 1;
  totalPages: number = 20; // 200 products / 10 per page
  totalPagesArray: number[] = [];

  ngOnInit(): void {
    // Initialize pagination array
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);

    // Load first page
    this.loadProducts(this.currentPage);
  }

  loadProducts(page: number) {
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;

    this._productApi.fetchProducts(page, 10).subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (err) => console.error(err),
    });
  }

  loadPage(page: number) {
    this.loadProducts(page);
  }
}
