import { provideRouter, Routes } from '@angular/router';
import { HomePage } from './features/home/home-page/home-page';
import { ProductsList } from './features/products/components/products-list/products-list';
import { CategoryDetail } from './features/categories/components/category-detail/category-detail';
import { CategoryList } from './features/categories/components/categories-list/categories-list';

import { provideHttpClient } from '@angular/common/http';

const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'products', component: ProductsList },
  { path: 'category/:id', component: CategoryDetail },
   { path: 'categories', component: CategoryList },
];

export const appConfig = [
  provideRouter(routes),
  provideHttpClient()
];

