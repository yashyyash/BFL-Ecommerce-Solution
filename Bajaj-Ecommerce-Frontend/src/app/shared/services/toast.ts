import { Injectable, signal } from '@angular/core';

// Define the structure of a Toast message
export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  // A signal to hold the array of active toasts
  toasts = signal<Toast[]>([]);

  // Method to add a new toast
  add(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const id = new Date().getTime(); // Simple unique ID
    const newToast: Toast = { id, message, type };

    // Add the new toast to the array
    this.toasts.update((currentToasts) => [...currentToasts, newToast]);

    // Automatically remove the toast after 4 seconds (4000ms)
    setTimeout(() => {
      this.remove(id);
    }, 4000);
  }

  // Method to remove a toast by its ID
  remove(id: number) {
    this.toasts.update((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );
  }
}
