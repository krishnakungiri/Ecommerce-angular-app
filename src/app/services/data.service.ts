import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Brand, Category, FiltersData, FiltersDataAPI, Product } from '../models/products-data.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // private apiUrl = 'http://localhost:3000';
  private apiUrl = 'http://localhost:5000/api';

  public filtersData$ = new Subject<FiltersData>;
  public categoryBrandsBehSubject$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  public categoryFilterSubject$: Subject<number> = new Subject<number>;
  // categoryFilter$ = this.categoryFilterSubject.asObservable();

  constructor(private http: HttpClient) { }

  getProducts(filters: FiltersDataAPI): Observable<Product[]> {
    // return this.http.get<Product[]>(`${this.apiUrl}/products`);
    let params = new HttpParams();

    if (filters.category !== undefined && filters.category) {
      params = params.set('category', filters.category.toString());
    }

    if (filters.brand && filters.brand.length > 0) {
      params = params.set('brand', JSON.stringify(filters.brand));
    }

    if (filters.rating !== undefined) {
      params = params.set('rating', filters.rating.toString());
    }

    if (filters.price) {
      params = params.set('price', JSON.stringify(filters.price));
    }

    return this.http.get<Product[]>(`${this.apiUrl}/products`, { params });
  }

  getBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.apiUrl}/brands`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }
}
