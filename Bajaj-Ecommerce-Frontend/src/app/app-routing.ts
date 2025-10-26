import { Routes, RouterModule } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HomePage } from './features/home/home-page/home-page';
import { ProductsList } from './features/products/components/products-list/products-list';
import { CategoryDetail } from './features/categories/components/category-detail/category-detail';

export const routes: Routes = [
  { path: '', component: HomePage }, // default route
  { path: 'products', component: ProductsList },
  { path: 'category/:id', component: CategoryDetail },
  { path: '**', redirectTo: '' }, // fallback route
];

export const appRouting = importProvidersFrom(RouterModule.forRoot(routes));
