import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Product, ProductFilters } from '../../../../core/models/product.model';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import {
  loadProducts,
  setFilters,
} from '../../../../store/product/product.actions';
import {
  selectFilteredProducts,
  selectProductCategories,
  selectProductsLoading,
} from '../../../../store/product/product.selectors';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatGridListModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ProductCardComponent,
    LoadingSpinnerComponent,
  ],
})
export class ProductListComponent {
  private readonly store = inject(Store);

  products$: Observable<Product[]> = this.store.select(selectFilteredProducts);
  loading$: Observable<boolean> = this.store.select(selectProductsLoading);
  categories$: Observable<string[]> = this.store.select(
    selectProductCategories,
  );

  searchTerm = '';
  selectedCategory = '';
  sortBy = '';

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
  }

  onSearchChange(): void {
    this.updateFilters();
  }

  onCategoryChange(): void {
    this.updateFilters();
  }

  onSortChange(): void {
    this.updateFilters();
  }

  private updateFilters(): void {
    const filters: ProductFilters = {
      searchTerm: this.searchTerm || undefined,
      category: this.selectedCategory || undefined,
      sortBy: (this.sortBy as any) || undefined,
    };
    this.store.dispatch(setFilters({ filters }));
  }
}
