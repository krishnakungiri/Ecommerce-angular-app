import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/products-data.interface';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.css'
})
export class TopMenuComponent implements OnInit {

  categories!: Category[]
  selectedCategory!: Category
  cartCount!: number;

  constructor(
    private dataService: DataService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataService.getCategories().subscribe((data) => {
      this.categories = data
      // this.selectedCategory = data[0]
    })
    this.cartService.cart$.subscribe(products => {
      this.cartCount = products.length
    })
  }

  onSelectItem(item: Category) {
    this.selectedCategory = item
    this.dataService.categoryBrandsBehSubject$.next(item.brands);
    this.dataService.filtersData$.next({ category: item }); //Not useful in after api filters implementation
    this.dataService.categoryFilterSubject$.next(item.id);
  }

  isSelected(category: Category): boolean {
    return this.selectedCategory === category
  }

  redirectToCart(): void {
    this.router.navigate(['/cart']);
  }

  redirectToWishlist(): void {
    this.router.navigate(['/wishlist']);
  }
}
