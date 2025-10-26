import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from './shared/components/navbar/navbar';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
  standalone: true,
  imports: [RouterModule, Navbar],
})
export class AppComponent {}
