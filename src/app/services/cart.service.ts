import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartProduct, Product } from '../models/products-data.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<CartProduct[]>(this.loadCart());
  cart$ = this.cartSubject.asObservable();

  loadCart(): CartProduct[] {
    const savedCart = localStorage.getItem('cartProducts');
    return savedCart ? JSON.parse(savedCart) : [];
  }

  saveCart(cart: CartProduct[]): void {
    localStorage.setItem('cartProducts', JSON.stringify(cart));
  }

  getCart(): CartProduct[] {
    return this.cartSubject.value;
  }

  addToCart(product: Product): void {
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

  updateQuantity(product: CartProduct, quantity: number): void {
    const cart = this.getCart();
    const productToUpdate = cart.find(item => item.id == product.id)
    if (productToUpdate && quantity > 0) {
      productToUpdate.quantity = quantity
      this.saveCart(cart);
      this.cartSubject.next(cart);
    } else if (productToUpdate && quantity === 0) {
      this.removeFromCart(product)
    }
  }

  removeFromCart(product: CartProduct): void {
    const cart = this.getCart().filter(item => item.id !== product.id)
    this.cartSubject.next(cart);
    this.saveCart(cart);
  }
}
