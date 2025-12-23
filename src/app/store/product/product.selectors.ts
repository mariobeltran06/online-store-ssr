import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from '../../core/models/product.model';
import { ProductsState } from './product.state';

export const selectProductsState = createFeatureSelector<ProductsState>('products');

export const selectAllProducts = createSelector(
  selectProductsState,
  (state) => state.products
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  (state) => state.loading
);

export const selectProductsError = createSelector(
  selectProductsState,
  (state) => state.error
);

export const selectSelectedProduct = createSelector(
  selectProductsState,
  (state) => state.selectedProduct
);

export const selectProductFilters = createSelector(
  selectProductsState,
  (state) => state.filters
);

export const selectFilteredProducts = createSelector(
  selectAllProducts,
  selectProductFilters,
  (products, filters) => {
    let filtered = [...products];

    // Search term
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      );
    }

    // Category
    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    // Price range
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((p) => p.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
    }

    // Sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'name':
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'price-asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
      }
    }

    return filtered;
  }
);

export const selectProductCategories = createSelector(
  selectAllProducts,
  (products) => {
    const categories = products.map((product: Product) => product.category);
    return Array.from(new Set(categories));
  }
);