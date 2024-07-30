import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../../services/cart/cart.service';
import { CartProduct } from '../../models/products-data.interface';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartProducts: CartProduct[] = [];
  cartCount!: number;
  subTotal!: number;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((products) => {
      this.cartProducts = products;
      this.cartCount = products.length;
      this.subTotal = this.getSubTotal();
    });
  }

  getSubTotal(): number {
    let total = this.cartProducts.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
    return total;
  }

  increaseQuantity(product: CartProduct): void {
    this.cartService.updateQuantity(product, product.quantity + 1);
  }

  decreaseQuantity(product: CartProduct): void {
    this.cartService.updateQuantity(product, product.quantity - 1);
  }

  removeFromCart(product: CartProduct): void {
    this.cartService.removeFromCart(product);
  }
}
