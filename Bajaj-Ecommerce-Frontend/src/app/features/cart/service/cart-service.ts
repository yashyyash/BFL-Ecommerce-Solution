import { Injectable, signal, computed, effect } from '@angular/core';
import { CartItem, Product } from '../model/cart-model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // Key for storing the cart in localStorage
  private readonly CART_STORAGE_KEY = 'bajaj_ecommerce_cart';

  // Use a Signal to hold the cart state
  public cart = signal<CartItem[]>([]);

  // Public computed signals for other components (like your navbar) to use
  public totalItems = computed(() =>
    this.cart().reduce((acc, item) => acc + item.quantity, 0)
  );
  
  public totalPrice = computed(() =>
    this.cart().reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
  );

  constructor() {
    // 1. Load the cart from localStorage when the app starts
    this.loadCartFromStorage();

    // 2. Use an 'effect' to automatically save the cart to localStorage 
    //    WHENEVER the 'cart' signal changes. This is super powerful.
    effect(() => {
      this.saveCartToStorage(this.cart());
    });
  }

  public loadCartFromStorage(): void {
    try {
      const storedCart = localStorage.getItem(this.CART_STORAGE_KEY);
      if (storedCart) {
        this.cart.set(JSON.parse(storedCart));
      }
    } catch (e) {
      console.error("Error loading cart from localStorage", e);
      localStorage.removeItem(this.CART_STORAGE_KEY); // Clear corrupted data
    }
  }

  private saveCartToStorage(cartData: CartItem[]): void {
    try {
      localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(cartData));
    } catch (e) {
      console.error("Error saving cart to localStorage", e);
    }
  }

  // --- Public Methods ---

  /**
   * Adds a product to the cart. 
   * If the product is already in the cart, its quantity is increased by 1.
   */
  public addItem(product: Product): void {
    this.cart.update(currentCart => {
      const existingItem = currentCart.find(item => item.product._id === product._id);

      if (existingItem) {
        // Product already in cart, just increase quantity
        return currentCart.map(item =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Product not in cart, add it as a new item
        return [...currentCart, { product: product, quantity: 1 }];
      }
    });
    // The 'effect' in the constructor will automatically save this change
    console.log(`Cart updated:`, this.cart());
  }

  /**
   * Removes an item completely from the cart.
   */
  public removeItem(productId: string): void {
    this.cart.update(currentCart =>
      currentCart.filter(item => item.product._id !== productId)
    );
  }

  /**
   * Updates the quantity of a specific item in the cart.
   * If quantity is 0 or less, the item is removed.
   */
  public updateQuantity(productId: string, newQuantity: number): void {
    if (newQuantity < 1) {
      // If quantity is 0 or less, remove the item
      this.removeItem(productId);
      return;
    }

    this.cart.update(currentCart =>
      currentCart.map(item =>
        item.product._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  }

  /**
   * Empties the entire cart.
   */
  public clearCart(): void {
    this.cart.set([]);
  }

  // --- FUTURE STEP ---
  // When you add authentication:
  // 1. When a user logs in, you'll call a new method like 'migrateLocalStorageCartToFirestore()'
  // 2. That method will read this.cart(), save it to Firestore, and then call clearCart().
}
