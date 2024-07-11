import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MultiselectDropdownComponent } from './multiselect-dropdown/multiselect-dropdown.component';
import { DataService } from '../../services/data.service';
import { Brand, FiltersData, FiltersDataAPI } from '../../models/products-data.interface';
import { Observable, filter, map, toArray } from 'rxjs';
import { RatingFilterComponent } from './rating-filter/rating-filter.component';
import { PriceFilterComponent } from './price-filter/price-filter.component';
import { IpriceRangeFilter } from '../../models/products-data.interface';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [MultiselectDropdownComponent, RatingFilterComponent, PriceFilterComponent],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.css'
})
export class LeftSidebarComponent implements OnInit {
  @Output() selectedFilters = new EventEmitter<FiltersDataAPI>();
  @ViewChild(MultiselectDropdownComponent) multiselectDropdownComponent!: MultiselectDropdownComponent;

  allbrands!: Brand[];
  filters: FiltersDataAPI = {}

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getAllBrands();

    this.dataService.categoryFilterSubject$.subscribe((category: number) => {
      this.filters.category = category
    })


    this.dataService.categoryBrandsBehSubject$.subscribe((categoryBrands: number[]) => {
      if (!categoryBrands.length) {
        this.getAllBrands();
      } else {
        this.dataService.getBrands().pipe(
          map((data) => {
            return data.filter((item: Brand) => categoryBrands.includes(Number(item.id)))
          }),
        ).subscribe(data => {
          this.allbrands = data;
        });
      }
    })
  }

  getAllBrands() {
    this.dataService.getBrands().subscribe((data: Brand[]) => {
      this.allbrands = data;
    })
  }

  onBrandChangeHandler(brands: Brand[]) {
    // this.dataService.filtersData$.next({ brands });
    if (this.filters.brand?.length) {
      this.filters.brand.push(brands[0].id)
    } else {
      this.filters['brand'] = [brands[0].id]
    }
  }

  onRatingChangeHandler(rating: number): void {
    // this.dataService.filtersData$.next({ rating });
    this.filters.rating = rating
  }

  onSelectPriceRange(price: IpriceRangeFilter): void {
    this.filters.price = { gt: price.priceMinValue, lt: price.priceMaxValue }
  }

  onApplyFilters(): void {
    this.applyFilters();
  }
  onClearFilters(): void {
    this.filters = {}
    this.multiselectDropdownComponent.selectedBrands = [];
    this.applyFilters();
  }

  applyFilters(): void {
    this.selectedFilters.emit(this.filters);
  }
}
