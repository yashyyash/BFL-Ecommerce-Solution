import { Routes } from '@angular/router';
import { HomePage } from './features/home/home-page/home-page';
import { ProductsList } from './features/products/components/products-list/products-list';
import { CategoryDetail } from './features/categories/components/category-detail/category-detail';
// 1. REMOVE the incorrect component import
// import { AddToCart } from './features/cart/components/add-to-cart/add-to-cart';

// 2. ADD the correct page component import
import { AddToCart } from './features/cart/components/add-to-cart/add-to-cart';
import { CartPageComponent } from './features/cart/components/cart-page/cart-page';


// This is the modern, standalone routes definition.
// This file now only exports the 'routes' array.
// It is imported by your 'app.config.ts' file and provided to the app using 'provideRouter(routes)'.
export const routes: Routes = [
  { 
    path: '', 
    component: HomePage, 
    title: 'Home Page' // default route
  },
  { 
    path: 'products', 
    component: ProductsList, 
    title: 'Products'
  },
  { 
    path: 'category/:id', 
    component: CategoryDetail,
    title: 'Category Details'
  },
  {
    path : 'cart',
    component: CartPageComponent, 
    title:'Cart'
  },
  { 
    path: '**', 
    redirectTo: '' // fallback route (redirects to home)
  },
];
