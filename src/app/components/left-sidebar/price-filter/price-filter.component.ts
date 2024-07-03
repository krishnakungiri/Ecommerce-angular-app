import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-price-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './price-filter.component.html',
  styleUrl: './price-filter.component.css'
})
export class PriceFilterComponent {
  priceMinValue: number = 500
  priceMaxValue: number = 100000

  constructor(private dataService: DataService) { }

  onPriceChange() {
    this.dataService.filtersData$.next({ price: [this.priceMinValue, this.priceMaxValue] })
  }

}
