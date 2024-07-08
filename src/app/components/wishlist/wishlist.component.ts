import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/products-data.interface';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {

  wishlistProducts!: Product[];

  constructor(private wishlistService: WishlistService) { }

  ngOnInit(): void {
    this.wishlistService.wishlist$.subscribe(products => {
      this.wishlistProducts = products
    })
  }

  removeFromWishlist(product: Product): void {
    this.wishlistService.removeFromWishlist(product)
  }

}
