import { Component, OnInit } from '@angular/core';
import { MultiselectDropdownComponent } from '../multiselect-dropdown/multiselect-dropdown.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [MultiselectDropdownComponent],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.css'
})
export class LeftSidebarComponent implements OnInit {
  brands: any

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getBrands().subscribe((value: any) => {
      this.brands = value
    })
  }

  onBrandChange(brands: any) {
    this.dataService.filtersData.next({ brands })

    console.log("event :", brands);


  }
}
