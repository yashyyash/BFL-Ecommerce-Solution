import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrls: ['./toast.css'],
})
export class ToastComponent {
  // Inject the service
  toastService = inject(ToastService);

  // Expose the toasts signal directly to the template
  toasts = this.toastService.toasts;

  // Get the CSS class based on the toast type
  getToastClass(type: 'success' | 'error' | 'info'): string {
    switch (type) {
      case 'success':
        return 'bg-success text-white';
      case 'error':
        return 'bg-danger text-white';
      case 'info':
      default:
        return 'bg-info text-dark';
    }
  }

  // Allow manual closing of a toast
  closeToast(id: number) {
    this.toastService.remove(id);
  }
}
