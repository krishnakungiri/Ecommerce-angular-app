import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/products-data.interface';
import { Router } from '@angular/router';

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

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.dataService.getCategories().subscribe((data) => {
      this.categories = data
      // this.selectedCategory = data[0]
    })
  }

  selectItem(item: Category) {
    this.selectedCategory = item
    this.dataService.categoryBrandsBehSubject$.next(item.brands);
    this.dataService.filtersData$.next({ category: item })
  }

  isSelected(category: Category): boolean {
    return this.selectedCategory === category
  }

  redirectToCart() {
    this.router.navigate(['/cart']);
  }
}
