import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/components/product-list/product-list.component').then(
        (m) => m.ProductListComponent,
      ),
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./features/products/components/product-detail/product-detail.component').then(
        (m) => m.ProductDetailComponent,
      ),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/components/cart-view/cart-view.component').then(
        (m) => m.CartViewComponent,
      ),
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./features/checkout/components/checkout-form/checkout-form.component').then(
        (m) => m.CheckoutFormComponent,
      ),
  },
  {
    path: 'order-success',
    loadComponent: () =>
      import('./features/checkout/components/order-success/order-success.component').then(
        (m) => m.OrderSuccessComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '/products',
  },
];
