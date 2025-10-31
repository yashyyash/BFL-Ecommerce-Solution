import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// Import RouterLink for the template
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../cart/service/cart-service'; // Import CartService to clear cart
// import { OrderService } from '../orders/order-service';


@Component({
  selector: 'app-checkout',
  standalone: true,
  // Add RouterLink to imports
  imports: [CommonModule, RouterLink],
  template: `
    <div class="container mt-5 text-center">
      @if (!paymentComplete) {
        <h2>Checkout</h2>
        <p>Review your order details below.</p>
        <!-- 
          TODO: Display order summary/items here 
          (fetch from cart service if needed, this example uses total price) 
        -->
        
        <div class="card my-4 mx-auto" style="max-width: 400px;">
          <div class="card-body">
            <h5 class="card-title">Order Total</h5>
            <!-- Example: Fetch total from CartService -->
            <p class="card-text fs-4 fw-bold">\${{ cartService.totalPrice() | number:'1.2-2' }}</p> 
            <button 
              class="btn btn-primary w-100" 
              (click)="processPayment()"
              [disabled]="isProcessing"
            >
              @if (isProcessing) {
                <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                Processing...
              } @else {
                Simulate Payment
              }
            </button>
            <p class="text-muted small mt-2">(This is a demo - no real payment)</p>
          </div>
        </div>
        
      } @else {
        <!-- Thank You Message -->
        <div class="alert alert-success" role="alert">
          <h4 class="alert-heading">Thank You!</h4>
          <p>Your payment was successful and your order has been placed.</p>
          <hr>
          <p class="mb-0">Transaction ID: {{ transactionId }}</p> 
        </div>
        <p>Redirecting you back to the home page shortly...</p>
        <!-- RouterLink is now available -->
        <a [routerLink]="['/']" class="btn btn-secondary">Go Home Now</a> 
      }
    </div>
  `,
  styles: [`
    .alert {
      max-width: 600px;
      margin: 2rem auto; /* Center the alert */
    }
  `]
}) 
export class CheckoutComponent implements OnInit { // Class name is correct
  private router = inject(Router);
  public cartService = inject(CartService); 

  paymentComplete = false; 
  isProcessing = false;    
  transactionId: string | null = null; 

  ngOnInit(): void {
    // Optional: Fetch cart details here
  }

  processPayment(): void {
    this.isProcessing = true; 
    console.log('Simulating payment processing...');

    setTimeout(() => {
      console.log('Payment successful!');
      this.transactionId = `TXN-${Date.now()}`; 
      this.paymentComplete = true; 
      this.isProcessing = false; 

      // Clear the cart - **VERIFY this method name in your CartService**
      this.cartService.clearCart(); // Changed from clearCartSignal()

      setTimeout(() => {
        this.router.navigate(['/']);
      }, 5000); 

    }, 2000); 
  }
}


// export class CheckoutComponent implements OnInit {
//   private router = inject(Router);
//   public cartService = inject(CartService);

//   // constructor(private orderService: OrderService) { }

//   paymentComplete = false;
//   isProcessing = false;
//   transactionId: string | null = null;

//   ngOnInit(): void {
//     // Optional: Fetch cart details here
//   }

//   processPayment(): void {
//     this.isProcessing = true;
//     console.log('Simulating payment processing...');

//     const cart = this.cartService.loadCartFromStorage(); // Make sure this method exists and returns cart data

//     this.simulateCheckout(cart);

//     setTimeout(() => {
//       this.transactionId = `TXN-${Date.now()}`;
//       this.paymentComplete = true;
//       this.isProcessing = false;

//       this.cartService.clearCart(); // Ensure this method exists in CartService

//       setTimeout(() => {
//         this.router.navigate(['/']);
//       }, 5000);
//     }, 2000);
//   }

  // simulateCheckout(cart: any): void {
  //   const orderPayload = {
  //     userId: '6902dc69f7c062b5bda7208b',
  //     cartItems: this.cartService.loadCartFromStorage(), // assuming this returns an array of items
  //     shippingAddress: {
  //       street: '123 Main St',
  //       city: 'Pune',
  //       state: 'MH',
  //       postalCode: '411001',
  //       country: 'India'
  //     },
  //     paymentMethod: 'COD', // or 'Credit Card', etc.
  //     totalAmount: 12345.67
  //   };

  //   this.orderService.PosttoDB(cart).subscribe({
  //     next: (res) => console.log('Payment successful!', res),
  //     error: (err) => console.error('Payment failed!', err),
  //   });
  // }
