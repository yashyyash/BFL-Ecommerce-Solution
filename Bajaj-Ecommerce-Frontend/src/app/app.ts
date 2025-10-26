import { Component, signal } from '@angular/core';
import { Footer } from './shared/components/footer/footer';
import { Navbar } from "./shared/components/navbar/navbar";
import { ProductsList } from "./features/products/components/products-list/products-list";
import { CategoryList } from "./features/categories/components/categories-list/categories-list";
import { SliderComponent } from "./shared/components/slider/slider";


@Component({
  selector: 'bajaj-root',
  imports: [Footer, Navbar, ProductsList, CategoryList, SliderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Bajaj-ecommerece-app');
}


