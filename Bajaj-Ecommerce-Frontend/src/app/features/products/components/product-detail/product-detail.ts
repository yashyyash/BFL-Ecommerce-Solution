import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ProductApiService } from '../../service/product-api-service';
import { Product } from '../../model/product-model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css'],
  standalone: true,
  imports: [CommonModule, DecimalPipe],
})
export class ProductDetail implements OnInit {
  @Input() productId!: string;  // The ID passed from product list

  private productApi = inject(ProductApiService);

  product?: Product;
  loading = true;
  error = '';

  ngOnInit(): void {
    if (this.productId) {
      this.productApi.fetchProductById(this.productId).subscribe({
        next: (res) => {
          this.product = res.data;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load product.';
          console.error(err);
          this.loading = false;
        },
      });
    } else {
      this.error = 'No product selected.';
      this.loading = false;
    }
  }
}
