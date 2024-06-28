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
      throw Error;

    }, (error) => {
      alert('Failer to load products' + error)
    });
  }

  subscribeToFilters() {
    this.dataService.filtersData.subscribe((data: FiltersData) => {
      this.filteredProducts = this.getFilteredProducts(data)

      console.log("this.filteredProducts :", this.filteredProducts);
      console.log("this.products :", this.products);


      if (this.filteredProducts.length === 0) {
        this.filteredProducts = this.products
      }
    }, (error) => {
      alert('Failed to subscribe filter' + error)
    })
  }

  getFilteredProducts(filters: FiltersData): any {
    console.log("filters :", filters);

    // let data;
    if (filters.category) {
      let data = this.products.filter((product: Product): any => {
        if (product.categoryId == filters.category?.id) {
          return product
        }
      })
      console.log("Data :", data);
      return data
    }
    if (filters.brands?.length) {
      return this.products.filter((product: Product) => {
        return filters.brands?.some((brand: any) => brand.id === product.brandId.toString());
      });
    }

    // return data
  }
}
