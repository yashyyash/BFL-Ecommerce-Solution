import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { Footer } from './shared/components/footer/footer'; // Assuming you have this
import { ToastComponent } from './shared/components/toast/toast';
import { HomePage } from "./features/home/home-page/home-page";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer, ToastComponent, HomePage], 
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  title = 'Bajaj-Ecommerce-Frontend';
}