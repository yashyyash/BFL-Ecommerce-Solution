import { Component, OnInit, inject, Input } from '@angular/core';
import { ProductApiService } from '../../service/product-api-service';
import { Product } from '../../model/product-model';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ProductDetail } from '../product-detail/product-detail';
import { ActivatedRoute } from '@angular/router';
import { Footer } from "../../../../shared/components/footer/footer";
import { CartService } from '../../../cart/service/cart-service';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.html',
  styleUrls: ['./products-list.css'],
  standalone: true,
  imports: [
    CommonModule, // Provides NgFor, NgIf
    DecimalPipe, // Provides number pipe
    ProductDetail,
    Footer
],
})
export class ProductsList implements OnInit {
  // Inject service using function injection
  private _route = inject(ActivatedRoute);
  private _productApi = inject(ProductApiService);
  private _cartService = inject(CartService);
  @Input() productId!: string;
  products: Product[] = [];
  selectedProductId?: string;
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

  viewDetails(id: string) {
  this.selectedProductId = id;
  }

  closeDetail() {
    this.selectedProductId = undefined;
  }

  // 6. Add this method to connect your button!
  addToCart(product: Product): void {
    this._cartService.addItem(product);
    // Optional: Add a toast notification here to show it worked
    console.log(`Added ${product.name} to cart!`);
  }
}
