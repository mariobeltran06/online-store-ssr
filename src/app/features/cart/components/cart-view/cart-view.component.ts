import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Cart } from '../../../../core/models/cart.model';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { clearCart, loadCart } from '../../../../store/cart/cart.actions';
import {
  selectCartLoading,
  selectCartSummary,
} from '../../../../store/cart/cart.selectors';
import { CartItemComponent } from '../../components/cart-item/cart-item.component';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    CartItemComponent,
    LoadingSpinnerComponent,
  ],
})
export class CartViewComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  cartSummary$: Observable<Cart> = this.store.select(selectCartSummary);
  loading$: Observable<boolean> = this.store.select(selectCartLoading);

  ngOnInit(): void {
    this.store.dispatch(loadCart());
  }

  onClearCart(): void {
    if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
      this.store.dispatch(clearCart());
    }
  }

  onProceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}
