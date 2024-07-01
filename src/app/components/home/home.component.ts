import { Component, OnInit } from '@angular/core';
import { LeftSidebarComponent } from "../left-sidebar/left-sidebar.component";
import { ProductCardComponent } from "./product-card/product-card.component";
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Brand, FiltersData, Product } from '../../models/products-data.interface'

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [CommonModule, LeftSidebarComponent, ProductCardComponent,]
})
export class HomeComponent implements OnInit {

  products!: Product[]
  filteredProducts!: Product[]

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadProducts();
    this.subscribeToFilters();
  }

  loadProducts() {
    this.dataService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data
    }, (error) => {
      alert('Failer to load products' + error)
    });
  }

  subscribeToFilters() {
    this.dataService.filtersData$.subscribe((data: FiltersData) => {
      this.filteredProducts = this.getFilteredProducts(data)

      if (!this.filteredProducts?.length) this.filteredProducts = this.products
    }, (error) => {
      alert('Failed to subscribe filter' + error)
    })
  }

  getFilteredProducts(filters: FiltersData): any {
    if (filters.category) {
      return this.products.filter((product: Product): any => {
        if (product.categoryId == filters.category?.id) {
          return product
        }
      })
    }
    if (filters.brands?.length) {
      return this.products.filter((product: Product) => {
        return filters.brands?.some((brand: any) => brand.id == product.brandId);
      });
    }

  }
}
