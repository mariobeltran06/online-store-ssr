import { createReducer, on } from '@ngrx/store';
import * as ProductsActions from './product.actions';
import { initialState } from './product.state';

export const productsReducer = createReducer(
  initialState,
  on(ProductsActions.loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductsActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products,
    loading: false
  })),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(ProductsActions.loadProductDetail, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductsActions.loadProductDetailSuccess, (state, { product }) => ({
    ...state,
    selectedProduct: product,
    loading: false
  })),
  on(ProductsActions.loadProductDetailFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),
  on(ProductsActions.setFilters, (state, { filters }) => ({
    ...state,
    filters: { ...state.filters, ...filters }
  })),
  on(ProductsActions.clearFilters, (state) => ({
    ...state,
    filters: {}
  }))
);