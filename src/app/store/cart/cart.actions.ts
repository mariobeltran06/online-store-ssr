import { createAction, props } from '@ngrx/store';
import { CartItem } from '../../core/models/cart.model';
import { Product } from '../../core/models/product.model';

export const loadCart = createAction('[Cart] Load Cart');

export const loadCartSuccess = createAction(
  '[Cart] Load Cart Success',
  props<{ items: CartItem[] }>()
);

export const loadCartFailure = createAction(
  '[Cart] Load Cart Failure',
  props<{ error: string }>()
);

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ product: Product; quantity: number }>()
);

export const addToCartSuccess = createAction(
  '[Cart] Add To Cart Success',
  props<{ item: CartItem }>()
);

export const addToCartFailure = createAction(
  '[Cart] Add To Cart Failure',
  props<{ error: string }>()
);

export const updateCartItemQuantity = createAction(
  '[Cart] Update Item Quantity',
  props<{ id: string; quantity: number }>()
);

export const updateCartItemQuantitySuccess = createAction(
  '[Cart] Update Item Quantity Success',
  props<{ item: CartItem }>()
);

export const removeFromCart = createAction(
  '[Cart] Remove From Cart',
  props<{ id: string }>()
);

export const removeFromCartSuccess = createAction(
  '[Cart] Remove From Cart Success',
  props<{ id: string }>()
);

export const clearCart = createAction('[Cart] Clear Cart');

export const clearCartSuccess = createAction('[Cart] Clear Cart Success');