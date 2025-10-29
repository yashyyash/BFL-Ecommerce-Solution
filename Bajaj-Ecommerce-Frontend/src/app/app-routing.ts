import { Routes } from '@angular/router';

// 1. CORRECTED Imports with the '...Component' suffix
import { HomePage } from './features/home/home-page/home-page';
import { ProductsList } from './features/products/components/products-list/products-list';
import { CategoryDetail } from './features/categories/components/category-detail/category-detail';
import { AddToCart } from './features/cart/components/add-to-cart/add-to-cart';
import { CartPageComponent } from './features/cart/components/cart-page/cart-page';
import { CategoryList } from './features/categories/components/categories-list/categories-list';
import { Signup } from './features/auth/components/signup/signup';

export const routes: Routes = [
 { 
  path: '', 
  component: HomePage, // <-- Changed
  title: 'Home Page'
 },
 { 
  path: 'products', 
  component: ProductsList, // <-- Changed
  title: 'Products'
 },
 {
  path : 'cart',
  component: CartPageComponent, // <-- This was already correct
  title:'Cart'
 },
 {
  path : 'addcart',
  component: AddToCart, // <-- Changed
  title:'Add to Cart'
 },
 {
   path: 'categories',
   component: CategoryList,
   title: 'categories'
 }
,
 { 
  path: 'category/:id', 
  component: CategoryDetail, // <-- Changed
 title: 'Category Details'
 },
 {
  path: 'signup',
  loadComponent: () => import('./features/auth/components/signup/signup').then(m => m.Signup),
  title: 'Sign-Up'
 },
 { 
  path: '**', 
 redirectTo: '' 
 },
]
;