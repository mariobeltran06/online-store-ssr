import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { initialState } from './cart.state';

export const cartReducer = createReducer(
  initialState,
  on(CartActions.loadCart, CartActions.addToCart, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CartActions.loadCartSuccess, (state, { items }) => ({
    ...state,
    items,
    loading: false
  })),
  on(CartActions.loadCartFailure, CartActions.addToCartFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(CartActions.addToCartSuccess, (state, { item }) => {
    const existingItemIndex = state.items.findIndex((i) => i.product.id === item.product.id);
    
    if (existingItemIndex > -1) {
      const updatedItems = [...state.items];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + item.quantity
      };
      return { ...state, items: updatedItems, loading: false };
    }
    
    return {
      ...state,
      items: [...state.items, item],
      loading: false
    };
  }),
  on(CartActions.updateCartItemQuantitySuccess, (state, { item }) => ({
    ...state,
    items: state.items.map((i) => (i.id === item.id ? item : i)),
    loading: false
  })),
  on(CartActions.removeFromCartSuccess, (state, { id }) => ({
    ...state,
    items: state.items.filter((i) => i.id !== id),
    loading: false
  })),
  on(CartActions.clearCartSuccess, (state) => ({
    ...state,
    items: [],
    loading: false
  }))
);