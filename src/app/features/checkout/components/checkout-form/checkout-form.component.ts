import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Cart } from '../../../../core/models/cart.model';
import {
  CustomerInfo,
  Order,
  PaymentInfo,
} from '../../../../core/models/order.model';
import { OrderService } from '../../../../core/services/order/order.service';
import { clearCart } from '../../../../store/cart/cart.actions';
import { selectCartSummary } from '../../../../store/cart/cart.selectors';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatDividerModule,
    MatSnackBarModule,
  ],
})
export class CheckoutFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly router = inject(Router);
  private readonly orderService = inject(OrderService);
  private readonly snackBar = inject(MatSnackBar);

  cartSummary$: Observable<Cart> = this.store.select(selectCartSummary);
  isProcessing = false;

  customerForm!: FormGroup;
  paymentForm!: FormGroup;
  ngOnInit(): void {
    this.initForms();
  }

  private initForms(): void {
    this.customerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
          ),
        ],
      ],
      address: ['', [Validators.required, Validators.minLength(5)]],
      city: ['', [Validators.required, Validators.minLength(2)]],
      zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]{4,10}$/)]],
    });

    this.paymentForm = this.fb.group({
      cardNumber: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{13,19}$/)],
      ],
      cardHolder: ['', [Validators.required, Validators.minLength(3)]],
      expirationDate: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(0[1-9]|1[0-2])\/([0-9]{2})$/),
        ],
      ],
      cvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
    });
  }

  formatCardNumber(event: any): void {
    let value = event.target.value.replace(/\s/g, '');
    const formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    event.target.value = formattedValue;
    this.paymentForm.patchValue({ cardNumber: value });
  }

  formatExpirationDate(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    event.target.value = value;
    this.paymentForm.patchValue({ expirationDate: value });
  }

  onConfirmOrder(cart: Cart): void {
    if (this.customerForm.invalid || this.paymentForm.invalid) {
      this.snackBar.open(
        'Por favor completa todos los campos correctamente',
        'Cerrar',
        {
          duration: 3000,
        },
      );
      return;
    }

    this.isProcessing = true;

    const customerInfo: CustomerInfo = this.customerForm.value;
    const paymentInfo: PaymentInfo = {
      ...this.paymentForm.value,
      cardNumber:
        '**** **** **** ' + this.paymentForm.value.cardNumber.slice(-4),
    };

    const order: Omit<Order, 'id'> = {
      items: cart.items,
      total: cart.totalPrice + (cart.totalPrice > 50 ? 0 : 5),
      customerInfo,
      paymentInfo,
      orderDate: new Date(),
      status: 'pending',
    };

    // Simular pago
    setTimeout(() => {
      this.orderService.createOrder(order).subscribe({
        next: (createdOrder) => {
          this.store.dispatch(clearCart());
          this.isProcessing = false;

          this.snackBar.open('¡Pedido realizado con éxito!', 'Cerrar', {
            duration: 5000,
            panelClass: ['success-snackbar'],
          });

          this.router.navigate(['/order-success'], {
            state: { order: createdOrder },
          });
        },
        error: () => {
          this.isProcessing = false;
          this.snackBar.open(
            'Error al procesar el pedido. Intenta nuevamente.',
            'Cerrar',
            {
              duration: 3000,
              panelClass: ['error-snackbar'],
            },
          );
        },
      });
    }, 2000);
  }
}
