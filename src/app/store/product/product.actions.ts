import { createAction, props } from '@ngrx/store';
import { Product, ProductFilters } from '../../core/models/product.model';

export const loadProducts = createAction('[Products] Load Products');

export const loadProductsSuccess = createAction(
  '[Products] Load Products Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Products] Load Products Failure',
  props<{ error: string }>()
);

export const loadProductDetail = createAction(
  '[Products] Load Product Detail',
  props<{ id: string }>()
);

export const loadProductDetailSuccess = createAction(
  '[Products] Load Product Detail Success',
  props<{ product: Product }>()
);

export const loadProductDetailFailure = createAction(
  '[Products] Load Product Detail Failure',
  props<{ error: string }>()
);

export const setFilters = createAction(
  '[Products] Set Filters',
  props<{ filters: ProductFilters }>()
);

export const clearFilters = createAction('[Products] Clear Filters');