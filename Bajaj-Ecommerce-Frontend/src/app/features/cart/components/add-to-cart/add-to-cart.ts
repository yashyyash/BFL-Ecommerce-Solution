
import { Component, inject } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../service/cart-service';
import { CartItem } from '../../model/cart-model';

@Component({
  selector: 'bajaj-add-to-cart',
  imports: [CommonModule, RouterLink, DecimalPipe],
  templateUrl: './add-to-cart.html',
  styleUrl: './add-to-cart.css',
})
export class AddToCart {
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
