import { Component, OnInit } from '@angular/core';
import { MultiselectDropdownComponent } from '../multiselect-dropdown/multiselect-dropdown.component';
import { DataService } from '../../services/data.service';
import { Brand } from '../../models/products-data.interface';
import { Observable, filter, map, toArray } from 'rxjs';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [MultiselectDropdownComponent],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.css'
})
export class LeftSidebarComponent implements OnInit {
  allbrands!: Brand[];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getAllBrands();

    this.dataService.categoryBrandsBehSubject$.subscribe((categoryBrands: number[]) => {
      if (!categoryBrands.length) {
        this.getAllBrands();
      } else {
        this.dataService.getBrands().pipe(
          map((data: any) => {
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

  onBrandChange(brands: any) {
    this.dataService.filtersData$.next({ brands })
  }
}
