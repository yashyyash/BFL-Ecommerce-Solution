import { Routes } from '@angular/router';

// Imports...
import { HomePage } from './features/home/home-page/home-page';
import { ProductsList } from './features/products/components/products-list/products-list';
import { CategoryDetail } from './features/categories/components/category-detail/category-detail';
import { AddToCart } from './features/cart/components/add-to-cart/add-to-cart'; // Assuming this component exists
import { CartPageComponent } from './features/cart/components/cart-page/cart-page';
import { CategoryList } from './features/categories/components/categories-list/categories-list';

// Import the guard
import { authGuard } from './features/auth/service/auth-guard'; // Verify this path is correct

// You need a component for the checkout page
// Example: import { CheckoutComponent } from './features/checkout/checkout.component';

export const routes: Routes = [
 {
  path: '',
  component: HomePage,
  title: 'Home Page'
 },
 {
  path: 'products',
  component: ProductsList,
  title: 'Products'
 },
 {
   path: 'categories',
   component: CategoryList,
   title: 'Categories'
 }
 ,
 {
  path: 'category/:id',
  component: CategoryDetail,
  title: 'Category Details'
 },

 // --- CART ROUTE (Now Publicly Viewable) ---
 {
  path : 'cart',
  component: CartPageComponent,
  title:'Cart'
  // Removed: canActivate: [authGuard]
 },

 // --- PROTECTED ROUTES ---
 // Consider if adding items should also be protected
 {
  path : 'addcart',
  component: AddToCart, // Make sure this component exists and is imported
  title:'Add to Cart',
  canActivate: [authGuard]
 },
// ... inside your routes array ...
{ 
   path: 'checkout',
   // Make sure this matches the class name 'CheckoutComponent'
   loadComponent: () => import('./features/checkout/checkout').then(m => m.CheckoutComponent), // ✅ Changed Checkout to CheckoutComponent
   title: 'Checkout',
   canActivate: [authGuard] 
 },
 // ...
 // --- AUTH ROUTES ---
  {
    path: 'signup',
    loadComponent: () => import('./features/auth/components/signup/signup').then(m => m.Signup),
    title: 'Sign-Up'
  },
  {
    path: 'signin',
    loadComponent: () => import('./features/auth/components/signin/signin').then(m => m.Signin),
    title: 'Sign-In'
  },
 {
  path: '**',
  redirectTo: ''
 },
];