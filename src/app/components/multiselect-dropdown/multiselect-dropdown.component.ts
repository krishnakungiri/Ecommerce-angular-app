import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Brand } from '../../models/products-data.interface';

@Component({
  selector: 'app-multiselect-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './multiselect-dropdown.component.html',
  styleUrl: './multiselect-dropdown.component.css'
})
export class MultiselectDropdownComponent implements OnInit, OnChanges {
  @Input() brands: Brand[] = [];
  @Output() selectedBrandsChange = new EventEmitter<Brand[]>();

  searchControl = new FormControl('');
  selectedBrands: Brand[] = [];
  filteredBrands!: Brand[]

  ngOnChanges(changes: SimpleChanges): void {
    if (this.brands?.length > 0) {
      this.filteredBrands = this.brands;
    }
  }

  ngOnInit() {
    this.searchControl.valueChanges.subscribe((value: any) => {
      this.filterBrands(value);
    });
  }

  filterBrands(value: string) {
    this.filteredBrands = this.brands.filter(brand => brand.name.toLowerCase().includes(value ? value.toLowerCase() : ''));
  }

  toggleBrandSelection(brand: any) {
    const index = this.selectedBrands.indexOf(brand);
    if (index > -1) {
      this.selectedBrands.splice(index, 1);
    } else {
      this.selectedBrands.push(brand);
    }

    this.selectedBrandsChange.emit(this.selectedBrands.length ? this.selectedBrands : [])
  }

  isSelected(brand: string): boolean {
    const index = this.selectedBrands.findIndex(value => value.name === brand)
    return index === -1 ? false : true
  }

  clearSearch() {
    this.searchControl.reset();
  }
}
