import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'bajaj-banner',
  imports: [CommonModule],
  templateUrl: './banner.html',
  styleUrl: './banner.css',
})
export class Banner {
    banners = [
    { image: '/ShoppingImages.png', text: 'Big Sale' },
    { image: '/Black-Friday.png', text: 'Black Friday' },
    { image: '/home&kitchen.png', text: 'Home & Kitchen' },
    { image: '/SmartPhones.png', text: 'Smart Phones' }
  ];
}
