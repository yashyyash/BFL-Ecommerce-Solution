import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductApiService } from '../../../products/service/product-api-service';
import { Product } from '../../../products/model/product-model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-detail.html',
  styleUrls: ['./category-detail.css']
})
export class CategoryDetail implements OnInit {
  private _productApi = inject(ProductApiService);
  private router = inject(Router); // <-- 2. Inject the Router
  private route = inject(ActivatedRoute); // <-- Keep this, you'll need it
  @Input() categoryId!: string;
  @Output() close = new EventEmitter<void>();

  products: Product[] = [];
  isLoading = true;

  ngOnInit(): void {
    this.fetchCategoryProducts();
  }

  // fetchCategoryProducts(): void {
  //   this._productApi.fetchProducts().subscribe({
  //     next: (res) => {
  //       this.products = res.data.filter(p => p.categoryId?._id === this.categoryId);
  //       this.isLoading = false;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching products:', err);
  //       this.isLoading = false;
  //     },
  //   });
  // }
  fetchCategoryProducts(): void {
    this._productApi.fetchProducts(1, 8, this.categoryId).subscribe({
      next: (res) => {
        this.products = res.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.isLoading = false;
      },
    });
  }
  closePopup() {
    this.close.emit();
  }
  goBackToCategories(): void {
    this.router.navigate(['/categories']);
  }
}
