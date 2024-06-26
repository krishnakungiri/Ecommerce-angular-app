import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    TopMenuComponent,
    LeftSidebarComponent,
    HomeComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: []
})
export class AppComponent {
  title = 'Ecommerce-app';

  brands = [
    { name: 'HIGHLANDER', count: 2842 },
    { name: 'Indian Terrain', count: 2804 },
    { name: 'Snitch', count: 2491 },
    { name: 'Louis Philippe Sport', count: 2208 },
    { name: 'U.S. Polo Assn.', count: 2073 },
    { name: 'SHOWOFF', count: 2069 },
    { name: 'Roadster', count: 2043 },
    { name: 'Mufti', count: 2030 }
  ];

  searchControl = new FormControl('');
  selectedBrands: string[] = [];
  filteredBrands = this.brands;

  ngOnInit() {
    this.searchControl.valueChanges.subscribe((value: any) => {
      this.filterBrands(value);
    });
  }

  filterBrands(value: string) {
    this.filteredBrands = this.brands.filter(brand => brand.name.toLowerCase().includes(value.toLowerCase()));
  }

  toggleBrandSelection(brand: string) {
    const index = this.selectedBrands.indexOf(brand);
    if (index > -1) {
      this.selectedBrands.splice(index, 1);
    } else {
      this.selectedBrands.push(brand);
    }
  }

  isSelected(brand: string): boolean {
    return this.selectedBrands.includes(brand);
  }
}
