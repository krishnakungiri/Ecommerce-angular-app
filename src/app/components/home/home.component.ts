import { Component, OnDestroy, OnInit } from '@angular/core';
import { LeftSidebarComponent } from "../left-sidebar/left-sidebar.component";
import { ProductCardComponent } from "./product-card/product-card.component";
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { Brand, FiltersData, FiltersDataAPI, Product } from '../../models/products-data.interface'

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [CommonModule, LeftSidebarComponent, ProductCardComponent,]
})
export class HomeComponent implements OnInit, OnDestroy {

  products!: Product[]
  filteredProducts!: Product[]

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadProducts({});
    this.dataService.categoryFilterSubject$.subscribe((category: number) => {
      this.loadProducts({ category });
    })
  }

  loadProducts(filters: FiltersDataAPI) {
    this.dataService.getProducts(filters).subscribe(data => {
      this.products = data;
    }, (error) => {
      alert('Failed to load products' + error);
    });
  }

  hangleApplyFilters(filters: any) {
    this.loadProducts(filters);
  }

  ngOnDestroy(): void {
    this.dataService.categoryFilterSubject$.unsubscribe();
  }
}
