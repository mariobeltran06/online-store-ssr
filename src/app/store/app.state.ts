import { CartState } from './cart/cart.state';
import { ProductsState } from './product/product.state';

export interface AppState {
  products: ProductsState;
  cart: CartState;
}