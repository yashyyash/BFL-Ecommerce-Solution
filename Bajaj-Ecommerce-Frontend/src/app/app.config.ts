// import { provideRouter, Routes } from '@angular/router';
// import { HomePage } from './features/home/home-page/home-page';
// import { ProductsList } from './features/products/components/products-list/products-list';
// import { CategoryDetail } from './features/categories/components/category-detail/category-detail';
// import { CategoryList } from './features/categories/components/categories-list/categories-list';

// import { provideHttpClient } from '@angular/common/http';

// const routes: Routes = [
//   { path: '', component: HomePage },
//   { path: 'products', component: ProductsList },
//   { path: 'category/:id', component: CategoryDetail },
//    { path: 'categories', component: CategoryList },
// ];

// export const appConfig = [
//   provideRouter(routes),
//   provideHttpClient()
// ];

// 1. REMOVE all the component imports (HomePage, ProductsList, etc.)
//    They are not needed here.
import { provideRouter } from '@angular/router'; 
import { provideHttpClient } from '@angular/common/http';

// 2. IMPORT the 'routes' array from your app-routing.ts file
import { routes } from './app-routing';

// 3. DELETE the 'const routes: Routes = [...]' definition
//    that was here. It was the cause of the error.

// This 'appConfig' array is what should be exported and used
// in your main.ts file.
export const appConfig = [
  // 4. This will now provide the CORRECT routes, including '/cart'
  provideRouter(routes), 
  provideHttpClient()
];
