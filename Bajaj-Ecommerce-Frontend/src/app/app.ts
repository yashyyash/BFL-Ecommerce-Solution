import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';
import { Footer } from './shared/components/footer/footer'; // Assuming you have this
import { ToastComponent } from './shared/components/toast/toast';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer, ToastComponent], 
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  title = 'Bajaj-Ecommerce-Frontend';
}