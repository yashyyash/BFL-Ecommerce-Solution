// import { Component, OnInit, inject } from '@angular/core';
// import { CategoryService } from '../../service/category-service';
// import { Category } from '../../model/category-model';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-category-list',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './categories-list.html',
//   styleUrl: './categories-list.css',
// })
// export class CategoryList implements OnInit {
//   private _categoryApi = inject(CategoryService);

//   categories: Category[] = [];

//   ngOnInit(): void {
//     this._categoryApi.getCategories().subscribe({
//       next: (res) => {
//         this.categories = res.categories;
//       },
//       error: (err) => console.error('Error fetching categories:', err)
//     });
//   }
// }

import { Component, OnInit, inject } from '@angular/core';
import { CategoryService } from '../../service/category-service';
import { Category } from '../../model/category-model';
import { CommonModule } from '@angular/common';
import { CategoryDetail } from '../category-detail/category-detail';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, CategoryDetail],
  templateUrl: './categories-list.html',
  styleUrl: './categories-list.css',
})
export class CategoryList implements OnInit {
  private _categoryApi = inject(CategoryService);

  categories: Category[] = [];
  selectedCategoryId?: string;

  ngOnInit(): void {
    this._categoryApi.getCategories().subscribe({
      next: (res) => {
        this.categories = res.categories;
      },
      error: (err) => console.error('Error fetching categories:', err),
    });
  }

  viewCategoryDetail(id: string) {
    this.selectedCategoryId = id;
  }
}
