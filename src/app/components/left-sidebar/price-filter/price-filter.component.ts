import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { IpriceRangeFilter } from '../../../models/products-data.interface';

@Component({
  selector: 'app-price-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './price-filter.component.html',
  styleUrl: './price-filter.component.css'
})
export class PriceFilterComponent {
  @Output() selectedPriceRange = new EventEmitter<IpriceRangeFilter>();

  defaultPriceRange = {
    minPrice: 500,
    maxPrice: 100000
  }

  priceMinValue: number = this.defaultPriceRange.minPrice
  priceMaxValue: number = this.defaultPriceRange.maxPrice

  constructor(private dataService: DataService) { }

  onPriceChange() {
    this.selectedPriceRange.emit({
      priceMinValue: this.priceMinValue,
      priceMaxValue: this.priceMaxValue
    },)
  }

}
