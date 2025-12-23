import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.state';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state) => state.items,
);

export const selectCartLoading = createSelector(
  selectCartState,
  (state) => state.loading,
);

export const selectCartError = createSelector(
  selectCartState,
  (state) => state.error,
);

export const selectCartTotalItems = createSelector(selectCartItems, (items) =>
  items.reduce((total, item) => total + item.quantity, 0),
);

export const selectCartTotalPrice = createSelector(selectCartItems, (items) =>
  items.reduce((total, item) => total + item.product.price * item.quantity, 0),
);

export const selectCartSummary = createSelector(
  selectCartItems,
  selectCartTotalItems,
  selectCartTotalPrice,
  (items, totalItems, totalPrice) => ({
    items,
    totalItems,
    totalPrice,
  }),
);
