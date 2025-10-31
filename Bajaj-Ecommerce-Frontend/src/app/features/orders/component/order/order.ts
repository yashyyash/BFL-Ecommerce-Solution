import { Component , inject} from '@angular/core';
import { OrderService } from '../../service/order';
import { WorkaroundOrder } from '../../model/order';

@Component({
  selector: 'app-order',
  templateUrl: './order.html',
  styleUrls: ['./order.css']
})

export class OrderComponent {

  private _orderService = inject(OrderService);

  pushOrderToWorkaround(orderId: string, customerEmail: string): void {
    const payload: WorkaroundOrder = {
      orderId,
      customerEmail
    };

    this._orderService.pushWorkaroundOrder(payload).subscribe({
      next: (res) => console.log('Workaround order saved!', res),
      error: (err) => console.error('Failed to save workaround order', err)
    });
  }

  fetchOrders(email: string): void {
    this._orderService.getOrdersByEmail(email).subscribe({
      next: (res) => console.log('Fetched orders:', res),
      error: (err) => console.error('Failed to fetch orders', err)
    });
  }
}