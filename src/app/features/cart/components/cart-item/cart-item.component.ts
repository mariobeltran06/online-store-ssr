import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartItem } from '../../../../core/models/cart.model';
import {
  removeFromCart,
  updateCartItemQuantity,
} from '../../../../store/cart/cart.actions';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
  ],
})
export class CartItemComponent implements OnInit {
  @Input({ required: true }) item!: CartItem;
  private readonly store = inject(Store);

  currentQuantity: number = 1;

  ngOnInit(): void {
    this.currentQuantity = this.item.quantity;
  }

  increaseQuantity(): void {
    if (this.currentQuantity < this.item.product.stock) {
      this.currentQuantity++;
      this.updateQuantity();
    }
  }

  decreaseQuantity(): void {
    if (this.currentQuantity > 1) {
      this.currentQuantity--;
      this.updateQuantity();
    }
  }

  onQuantityChange(): void {
    if (this.currentQuantity < 1) {
      this.currentQuantity = 1;
    } else if (this.currentQuantity > this.item.product.stock) {
      this.currentQuantity = this.item.product.stock;
    }
    this.updateQuantity();
  }

  private updateQuantity(): void {
    this.store.dispatch(
      updateCartItemQuantity({
        id: this.item.id,
        quantity: this.currentQuantity,
      }),
    );
  }

  onRemove(): void {
    if (confirm('¿Deseas eliminar este producto del carrito?')) {
      this.store.dispatch(removeFromCart({ id: this.item.id }));
    }
  }
}
