import { Component, signal } from '@angular/core';
import { SideNavbar } from './shared/components/side-navbar/side-navbar';
import { Slider } from './shared/components/slider/slider';
import { Banner } from './shared/components/banner/banner';
import { Footer } from './shared/components/footer/footer';

@Component({
  selector: 'bajaj-root',
   imports: [SideNavbar, Slider, Banner, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Bajaj-ecommerece-app');
}


