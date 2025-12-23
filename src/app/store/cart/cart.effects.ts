import { inject, Injectable } from '@angular/core';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CartService } from '../../core/services/cart/cart.service';
import * as CartActions from './cart.actions';

@Injectable()
export class CartEffects {
  private readonly actions$ = inject(Actions);
  private readonly cartService = inject(CartService);

  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCart),
      switchMap(() =>
        this.cartService.getCart().pipe(
          map((items) => CartActions.loadCartSuccess({ items })),
          catchError((error) =>
            of(CartActions.loadCartFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.addToCart),
      mergeMap(({ product, quantity }) => {
        const cartItem = {
          id: `cart-${Date.now()}`,
          product,
          quantity
        };
        return this.cartService.addToCart(cartItem).pipe(
          map((item) => CartActions.addToCartSuccess({ item })),
          catchError((error) =>
            of(CartActions.addToCartFailure({ error: error.message }))
          )
        );
      })
    )
  );

  updateCartItemQuantity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.updateCartItemQuantity),
      mergeMap(({ id, quantity }) =>
        this.cartService.getCart().pipe(
          switchMap((items) => {
            const item = items.find((i) => i.id === id);
            if (!item) {
              return of(CartActions.loadCartFailure({ error: 'Item not found' }));
            }
            const updatedItem = { ...item, quantity };
            return this.cartService.updateCartItem(id, updatedItem).pipe(
              map((item) => CartActions.updateCartItemQuantitySuccess({ item })),
              catchError((error) =>
                of(CartActions.loadCartFailure({ error: error.message }))
              )
            );
          })
        )
      )
    )
  );

  removeFromCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.removeFromCart),
      mergeMap(({ id }) =>
        this.cartService.removeFromCart(id).pipe(
          map(() => CartActions.removeFromCartSuccess({ id })),
          catchError((error) =>
            of(CartActions.loadCartFailure({ error: error.message }))
          )
        )
      )
    )
  );

  clearCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.clearCart),
      switchMap(() =>
        this.cartService.getCart().pipe(
          switchMap((items) => {
            const deleteObservables = items.map((item) =>
              this.cartService.removeFromCart(item.id)
            );
            return deleteObservables.length > 0
              ? Promise.all(deleteObservables)
              : of([]);
          }),
          map(() => CartActions.clearCartSuccess()),
          catchError((error) =>
            of(CartActions.loadCartFailure({ error: error.message }))
          )
        )
      )
    )
  );
}