import { CartItem } from './cart.model';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerInfo: CustomerInfo;
  paymentInfo: PaymentInfo;
  orderDate: Date;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
}

export interface PaymentInfo {
  cardNumber: string;
  cardHolder: string;
  expirationDate: string;
  cvv: string;
}
