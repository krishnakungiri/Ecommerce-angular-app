import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../../models/products-data.interface';
import { Store } from '@ngrx/store';
import { addToWishlist, removeFromWishlist } from './store/wishlist.action';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishlistSubject = new BehaviorSubject<Product[]>(this.loadWishlist());
  wishlist$ = this.wishlistSubject.asObservable();

  constructor(private wishlistStore: Store<{ wishlist: { wishlist: any } }>) {}

  loadWishlist(): Product[] {
    // const savedWishlist = localStorage.getItem('wishlistProducts');
    // return savedWishlist ? JSON.parse(savedWishlist) : [];
    //-------getting wishlist from NGRX store

    this.wishlistStore.select('wishlist').subscribe((data) => {
      console.log('dataCounter: ', data);

      this.wishlistSubject.next(data.wishlist);
    });
    return [];
  }

  saveWishlist(wishlist: Product[]): void {
    localStorage.setItem('wishlistProducts', JSON.stringify(wishlist));
  }

  getWishlist(): Product[] {
    return this.wishlistSubject.value;
  }

  addToWishlist(product: Product): void {
    // const wishlist = this.getWishlist();
    // const existingProduct = wishlist.find((item) => item.id === product.id);
    // if (!existingProduct) {
    //   wishlist.push(product);
    // }
    // this.wishlistSubject.next(wishlist);
    // this.saveWishlist(wishlist);
    //-----------Adding to ngrx store----------

    this.wishlistStore.dispatch(addToWishlist({ item: product }));
  }

  removeFromWishlist(product: Product): void {
    // const wishlist = this.getWishlist().filter(
    //   (item) => item.id !== product.id
    // );
    // this.wishlistSubject.next(wishlist);
    // this.saveWishlist(wishlist);
    //-----------Removing from ngrx store----------

    this.wishlistStore.dispatch(removeFromWishlist({ item: product }));
  }
}
