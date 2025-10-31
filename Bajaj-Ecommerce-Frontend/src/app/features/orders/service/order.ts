import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkaroundOrder } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:9090/api/workaround-orders';

  private _HttpClient = inject(HttpClient);

  pushWorkaroundOrder(data: WorkaroundOrder): Observable<any> {
    return this._HttpClient.post(this.apiUrl, data);
  }

  getOrdersByEmail(email: string): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}/${email}`);
  }
}
