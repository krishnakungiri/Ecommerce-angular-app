import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FiltersData } from '../models/products-data.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000';

  public filtersData = new Subject<FiltersData>;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }

  getBrands(): Observable<any> {
    return this.http.get(`${this.apiUrl}/brands`);
  }


}
