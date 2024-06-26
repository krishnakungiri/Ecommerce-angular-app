import { Component, OnInit } from '@angular/core';
import { LeftSidebarComponent } from "../left-sidebar/left-sidebar.component";
import { ProductCardComponent } from "./product-card/product-card.component";
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { FiltersData } from '../../models/products-data'

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [CommonModule, LeftSidebarComponent, ProductCardComponent]
})
export class HomeComponent implements OnInit {

  constructor(private dataService: DataService) { }

  products: any

  ngOnInit(): void {
    this.dataService.getProducts().subscribe(data => {
      this.products = data;
    });

    this.dataService.filtersData.subscribe((data: FiltersData) => {
      console.log("data::", data);

    })
  }
}
