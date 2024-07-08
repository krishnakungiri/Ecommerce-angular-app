import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CartProduct, Product } from '../../../models/products-data.interface';
import { CartComponent } from '../../cart/cart.component';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input("product") product: any

  constructor(private cartService: CartService) { }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  getStarsArray(rating: number): number[] {
    return Array(Math.floor(rating));
  }
}
