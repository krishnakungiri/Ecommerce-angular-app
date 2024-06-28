import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/products-data.interface';

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.css'
})
export class TopMenuComponent implements OnInit {

  categories!: Category[]

  constructor(private dataService: DataService) {

  }

  ngOnInit(): void {
    this.dataService.getCategories().subscribe((data) => {
      this.categories = data
    })
  }

  selectItem(item: Category) {
    console.log(item);
    this.dataService.filtersData.next({ category: item })
  }
}
