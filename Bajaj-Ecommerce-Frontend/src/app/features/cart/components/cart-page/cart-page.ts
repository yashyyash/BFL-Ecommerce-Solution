import { Component, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../service/cart-service'; // Adjusted path

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart-page.html',
  styleUrls: ['./cart-page.css']
})
export class CartPageComponent {
  // Inject the service
  cartService = inject(CartService);

  // Expose the signals directly to the template
  cart = this.cartService.cart;
  totalPrice = this.cartService.totalPrice;

  // Methods to link to buttons in the template
  removeItem(id: string): void {
    this.cartService.removeItem(id);
  }

  updateQuantity(id: string, event: Event): void {
    const newQuantity = (event.target as HTMLSelectElement).value;
    this.cartService.updateQuantity(id, +newQuantity);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}