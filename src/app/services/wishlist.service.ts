import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/products-data.interface';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistSubject = new BehaviorSubject<Product[]>(this.loadWishlist());
  wishlist$ = this.wishlistSubject.asObservable();

  constructor() { }

  loadWishlist(): Product[] {
    const savedWishlist = localStorage.getItem('wishlistProducts');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  }

  saveWishlist(wishlist: Product[]): void {
    localStorage.setItem('wishlistProducts', JSON.stringify(wishlist));
  }

  getWishlist(): Product[] {
    return this.wishlistSubject.value;
  }


  addToWishlist(product: Product): void {
    const wishlist = this.getWishlist();
    const existingProduct = wishlist.find(item => item.id === product.id);
    if (!existingProduct) {
      wishlist.push(product);
    }
    this.wishlistSubject.next(wishlist);
    this.saveWishlist(wishlist);
  }

  removeFromWishlist(product: Product): void {
    const wishlist = this.getWishlist().filter(item => item.id !== product.id)
    this.wishlistSubject.next(wishlist);
    this.saveWishlist(wishlist);
  }

}
