import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  public cartSubject = new BehaviorSubject<any[]>(this.loadCart());
  cart$ = this.cartSubject.asObservable();

  constructor() { }

  private loadCart(): any[] {
    const savedCart = localStorage.getItem('cartProducts');
    return savedCart ? JSON.parse(savedCart) : [];
  }

  cartProducts = [
    // Sample products
    { id: 1, name: 'Samsung', price: '$500', rating: 4, description: 'Samsung Galaxy', image: 'path-to-image', quantity: 1 },
    { id: 2, name: 'Apple', price: '$1000', rating: 5, description: 'Apple iPhone', image: 'path-to-image', quantity: 1 },
    // Add more products as needed
  ];

  increaseQuantity(product: any): void {
    product.quantity++;
  }

  decreaseQuantity(product: any): void {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }
}
