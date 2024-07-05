import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CartProduct } from '../../../models/products-data.interface';
import { CartComponent } from '../../cart/cart.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, CartComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input("product") product: any

  cartProducts: CartProduct[] = []

  constructor(private cartComponent: CartComponent) { }

  getCart(): any[] {
    return this.cartComponent.cartSubject.value;
  }

  addToCart1(product: any): void {
    const cart = this.getCart();
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    this.cartSubject.next(cart);
    this.saveCart(cart);
  }

  addToCart(product: any) {

    if (!this.cartProducts.length) {
      this.cartProducts.push(product)

    } else if (this.cartProducts.length && this.cartProducts.includes(product)) {
      //dont add
    }
    console.log("cartProducts:", this.cartProducts);

  }

  saveCart(): void {
    // const cartProducts = localStorage.getItem('cartProducts')
    localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts))
  }

  getStarsArray(rating: number): number[] {
    return Array(Math.floor(rating));
  }
}
