import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartProduct, Product } from '../../models/products-data.interface';
import { Store } from '@ngrx/store';
import { addToCart, removeFromCart, updateCart } from './store/cart.action';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private cartStore: Store<{ cart: { cart: any } }>) {}

  private cartSubject = new BehaviorSubject<CartProduct[]>(this.loadCart());
  cart$ = this.cartSubject.asObservable();

  loadCart(): CartProduct[] {
    // const savedCart = localStorage.getItem('cartProducts');
    // return savedCart ? JSON.parse(savedCart) : [];
    this.cartStore.select('cart').subscribe((data) => {
      console.log('cart data from store');
      this.cartSubject.next(data.cart);
    });
    return [];
  }

  saveCart(cart: CartProduct[]): void {
    localStorage.setItem('cartProducts', JSON.stringify(cart));
  }

  getCart(): CartProduct[] {
    return this.cartSubject.value;
  }

  addToCart(product: Product): void {
    // const cart = this.getCart();
    // const existingProduct = cart.find((item) => item.id === product.id);
    // if (existingProduct) {
    //   existingProduct.quantity += 1;
    // } else {
    //   cart.push({ ...product, quantity: 1 });
    // }
    // this.cartSubject.next(cart);
    // this.saveCart(cart);

    this.cartStore.dispatch(addToCart({ item: product }));
  }

  updateQuantity(product: CartProduct, quantity: number): void {
    // const cart = this.getCart();
    // const productToUpdate = cart.find((item) => item.id == product.id);
    // if (productToUpdate && quantity > 0) {
    //   productToUpdate.quantity = quantity;
    //   this.saveCart(cart);
    //   this.cartSubject.next(cart);
    // } else if (productToUpdate && quantity === 0) {
    //   this.removeFromCart(product);
    // }
    this.cartStore.dispatch(updateCart({ cartItem: product, quantity }));
  }

  removeFromCart(product: CartProduct): void {
    // const cart = this.getCart().filter((item) => item.id !== product.id);
    // this.cartSubject.next(cart);
    // this.saveCart(cart);
    this.cartStore.dispatch(removeFromCart({ cartItem: product }));
  }
}
