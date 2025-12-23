import { inject, Injectable } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../core/services/product/product.service';
import * as ProductsActions from './product.actions';

@Injectable()
export class ProductsEffects {
  private readonly actions$ = inject(Actions);
  private readonly productService = inject(ProductService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      switchMap(() =>
        this.productService.getProducts().pipe(
          map((products) => ProductsActions.loadProductsSuccess({ products })),
          catchError((error) =>
            of(ProductsActions.loadProductsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadProductDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProductDetail),
      switchMap(({ id }) =>
        this.productService.getProductById(id).pipe(
          map((product) => ProductsActions.loadProductDetailSuccess({ product })),
          catchError((error) =>
            of(ProductsActions.loadProductDetailFailure({ error: error.message }))
          )
        )
      )
    )
  );
}