import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../features/categories/service/category-service';
import { Category } from '../../../features/categories/model/category-model';
import { SideNavbar } from "../side-navbar/side-navbar";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, SideNavbar,RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar implements OnInit {
  private _categoryApi = inject(CategoryService);
  categories: Category[] = [];

  ngOnInit(): void {
    this._categoryApi.getCategories().subscribe({
      next: (res) => {
        // You can filter only top 5 categories here
        this.categories = res.categories.slice(0, 5);
      },
      error: (err) => console.error('Failed to load categories', err),
    });
  }
}

