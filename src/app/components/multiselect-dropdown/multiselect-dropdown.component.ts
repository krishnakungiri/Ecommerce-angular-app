import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Brand } from '../../models/products-data';

@Component({
  selector: 'app-multiselect-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './multiselect-dropdown.component.html',
  styleUrl: './multiselect-dropdown.component.css'
})
export class MultiselectDropdownComponent implements OnInit {
  @Input() brands: { name: string, count: number }[] = [];
  @Output() selectedBrandsChange = new EventEmitter<Brand[]>();

  searchControl = new FormControl('');
  selectedBrands: Brand[] = [];
  filteredBrands = this.brands;

  ngOnInit() {
    this.searchControl.valueChanges.subscribe((value: any) => {
      this.filterBrands(value);
    });
  }

  filterBrands(value: string) {
    this.filteredBrands = this.brands.filter(brand => brand.name.toLowerCase().includes(value.toLowerCase()));
    console.log("filterbrands value:", this.filteredBrands);
  }

  toggleBrandSelection(brand: any) {
    console.log("brand --:", brand);

    const index = this.selectedBrands.indexOf(brand);
    if (index > -1) {
      this.selectedBrands.splice(index, 1);
    } else {
      this.selectedBrands.push(brand);
    }

    this.selectedBrandsChange.emit(this.selectedBrands)
  }

  isSelected(brand: string): boolean {
    console.log(brand);

    return true
    // return this.selectedBrands.includes();
  }
}
