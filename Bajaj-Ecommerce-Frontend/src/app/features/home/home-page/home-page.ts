import { Router, RouterOutlet } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsList } from '../../products/components/products-list/products-list';
import { CategoryList } from '../../categories/components/categories-list/categories-list';
import { ProductApiService } from '../../products/service/product-api-service';
import { CategoryService } from '../../categories/service/category-service';
import { Navbar } from "../../../shared/components/navbar/navbar";
import { SliderComponent } from "../../../shared/components/slider/slider";
import { Footer } from "../../../shared/components/footer/footer";
import { CartPageComponent } from "../../cart/components/cart-page/cart-page";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css'],
  standalone: true,
  imports: [
    CommonModule,
    ProductsList,
    CategoryList,
    Navbar,
    SliderComponent,
    Footer,
    CartPageComponent,
    RouterOutlet
],
})

export class HomePage implements OnInit {
  private _router = inject(Router);
  private _productApi = inject(ProductApiService);
  private _categoryApi = inject(CategoryService);

  products: any[] = [];
  categories: any[] = [];

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this._productApi.fetchProducts(1, 8).subscribe({
      next: res => this.products = res.data,
      error: err => console.error(err)
    });
  }

  loadCategories() {
    this._categoryApi.getCategories().subscribe({
      next: res => this.categories = res.categories,
      error: err => console.error(err)
    });
  }
}
