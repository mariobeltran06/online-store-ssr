import { Product, ProductFilters } from '../../core/models/product.model';

export interface ProductsState {
  products: Product[];
  selectedProduct: Product | null;
  filters: ProductFilters;
  loading: boolean;
  error: string | null;
}

export const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
  filters: {},
  loading: false,
  error: null
};