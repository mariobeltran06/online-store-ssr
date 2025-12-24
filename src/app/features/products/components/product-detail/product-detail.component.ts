import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from 'express';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Product } from '../../../../core/models/product.model';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { addToCart } from '../../../../store/cart/cart.actions';
import { loadProductDetail } from '../../../../store/product/product.actions';
import {
  selectProductsLoading,
  selectSelectedProduct,
} from '../../../../store/product/product.selectors';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    LoadingSpinnerComponent,
  ],
})
export class ProductDetailComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  product$: Observable<Product | null> = this.store.select(
    selectSelectedProduct,
  );
  loading$: Observable<boolean> = this.store.select(selectProductsLoading);

  quantity = 1;

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    console.log('Product ID:', productId);
    if (productId) {
      this.store.dispatch(loadProductDetail({ id: productId }));
    }
  }

  onAddToCart(product: Product): void {
    this.store.dispatch(
      addToCart({
        product,
        quantity: this.quantity,
      }),
    );
  }

  onBuyNow(product: Product): void {
    this.onAddToCart(product);
    this.router.navigate(['/cart']);
  }
}
