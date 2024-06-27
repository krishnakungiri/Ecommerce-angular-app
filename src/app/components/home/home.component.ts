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

  constructor(private dataService: DataService) { }

  products: any
  filteredProducts: any

  ngOnInit(): void {
    this.dataService.getProducts().subscribe(data => {
      this.products = data;
      this.filteredProducts = data
    });

    this.dataService.filtersData.subscribe((data: FiltersData) => {
      this.filteredProducts = this.getFilteredProducts(data.brands)
      if (this.filteredProducts.length === 0) {
        this.filteredProducts = this.products
      }
    })
  }

  getFilteredProducts(brands: Brand[]): Product[] {
    const filters = this.products.filter((product: Product) => {
      return brands.some((brand: any) => brand.id === product.brandId.toString());
    });
    return filters
  }
}
