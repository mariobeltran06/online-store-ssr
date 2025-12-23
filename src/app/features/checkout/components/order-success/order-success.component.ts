import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { Order } from '../../../../core/models/order.model';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class OrderSuccessComponent implements OnInit {
  order: Order | null = null;
  private readonly router = inject(Router);

  constructor() {
    const navigation = this.router.currentNavigation();
    this.order = navigation?.extras?.state?.['order'] || null;
  }

  ngOnInit(): void {
    if (!this.order) {
      // Si no hay orden, redirigir a productos
      setTimeout(() => {
        this.router.navigate(['/products']);
      }, 3000);
    }
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      pending: 'Pendiente',
      completed: 'Completado',
      cancelled: 'Cancelado',
    };
    return labels[status] || status;
  }
}
