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
  @ViewChild(MultiselectDropdownComponent) brandDropdownComponent!: MultiselectDropdownComponent;
  @ViewChild(RatingFilterComponent) ratingFilterComponent!: RatingFilterComponent;
  @ViewChild(PriceFilterComponent) priceFilterComponent!: PriceFilterComponent;

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
    this.filters.brand = this.brandDropdownComponent.selectedBrands.map((brand: Brand) => brand.id)
  }

  onRatingChangeHandler(rating: number): void {
    this.filters.rating = rating
  }

  onSelectPriceRange(price: IpriceRangeFilter): void {
    this.filters.price = { gt: price.priceMinValue, lt: price.priceMaxValue }
  }

  onApplyFilters(): void {
    this.applyFilters();
  }
  onClearFilters(): void {
    // Clears all filters from api filter payload
    this.filters = {}
    // Clears brand selction
    this.brandDropdownComponent.selectedBrands = [];
    // Clears rating selection
    this.ratingFilterComponent.selectedRating = null
    // Sets Default price range
    let defaultPriceRange = this.priceFilterComponent.defaultPriceRange
    this.priceFilterComponent.priceMinValue = defaultPriceRange.minPrice
    this.priceFilterComponent.priceMaxValue = defaultPriceRange.maxPrice
    this.applyFilters();
  }

  applyFilters(): void {
    this.selectedFilters.emit(this.filters);
  }
}
