import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Product } from '../../../../core/models/product.model';
import { addToCart } from '../../../../store/cart/cart.actions';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
  ],
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  private readonly store = inject(Store);

  onAddToCart(): void {
    this.store.dispatch(
      addToCart({
        product: this.product,
        quantity: 1,
      }),
    );
  }
}
