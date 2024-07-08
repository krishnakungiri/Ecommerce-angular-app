import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Brand, Category, FiltersData, Product } from '../models/products-data.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000';

  public filtersData$ = new Subject<FiltersData>;
  public categoryBrandsBehSubject$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.apiUrl}/brands`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }
}
