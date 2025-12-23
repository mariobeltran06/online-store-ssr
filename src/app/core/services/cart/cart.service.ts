import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CartItem } from '../../models/cart.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  getCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.apiUrl}/cart`);
  }

  addToCart(item: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.apiUrl}/cart`, item);
  }

  updateCartItem(id: string, item: CartItem): Observable<CartItem> {
    return this.http.put<CartItem>(`${this.apiUrl}/cart/${id}`, item);
  }

  removeFromCart(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cart/${id}`);
  }

  clearCart(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cart`);
  }
}
