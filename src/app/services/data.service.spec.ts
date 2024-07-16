import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Brand, Category, Product } from '../models/products-data.interface';
import { of } from 'rxjs';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpClient;
  let baseUrl: string;
  const dummyProducts: Product[] = [
    {
      id: 1,
      name: 'Nike Sneaker',
      price: 15000,
      rating: 1,
      categoryId: 5,
      description: 'Comfortable and stylish sneakers for everyday wear.',
      brandId: 1,
      image:
        'https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/t/x/j/-original-imaghrbytengjbnu.jpeg?q=70',
    },
    {
      id: 2,
      name: 'Adidas Sports',
      price: 2000,
      rating: 2,
      categoryId: 2,
      description: 'High-performance sports shoes for athletes.',
      brandId: 2,
      image:
        'https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/f/q/h/-original-imagtajhaycgvexy.jpeg?q=70',
    },
  ];
  const dummyBrands: Brand[] = [
    {
      id: 1,
      name: 'Nike',
    },
    {
      id: 2,
      name: 'Adidas',
    },
  ];
  const dummyCategories: Category[] = [
    {
      id: 0,
      name: 'All',
      brands: [],
    },
    {
      id: 1,
      name: 'Mobile',
      brands: [3, 5, 6, 7],
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DataService,
        { provide: HttpClient, useValue: { get: jest.fn() } },
      ],
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpClient);

    baseUrl = service.apiUrl;
  });

  it('should call getProducts method and return results', () => {
    jest.spyOn(httpMock, 'get').mockReturnValue(of(dummyProducts));

    let filters = {};
    let httpParams: HttpParams = new HttpParams()

    service.getProducts(filters).subscribe((data) => {
      expect(data.length).toBe(2);
      expect(data).toEqual(dummyProducts);
    });
    console.log("cn :** ", httpParams);

    expect(httpMock.get).toHaveBeenCalledTimes(1);
    expect(httpMock.get).toHaveBeenCalledWith(`${baseUrl}/products`, { params: httpParams });
  });

  it('should call getProducts method with dilters and return results', () => {
    jest.spyOn(httpMock, 'get').mockReturnValue(of(dummyProducts));

    let filters = {
      category: 1,
      brand: [1],
      rating: 5,
      price: { gt: 100, lt: 1000 },
    };
    let httpParams: HttpParams = new HttpParams()
    httpParams = httpParams.set('category', filters.category.toString());
    httpParams = httpParams.set('brand', JSON.stringify(filters.brand));
    httpParams = httpParams.set('rating', filters.rating.toString());
    httpParams = httpParams.set('price', JSON.stringify(filters.price));

    service.getProducts(filters).subscribe((data) => {
      expect(data.length).toBe(2);
      expect(data).toEqual(dummyProducts);
    });

    let apiurl = `http://localhost:5000/api/products`;
    expect(httpMock.get).toHaveBeenCalledTimes(1);
    expect(httpMock.get).toHaveBeenCalledWith(apiurl, { params: httpParams });
  });

  it('should call getBrands method and return results', () => {
    jest.spyOn(httpMock, 'get').mockReturnValue(of(dummyBrands));

    let filters = {};
    service.getBrands().subscribe((data) => {
      expect(data.length).toBe(2);
      expect(data).toEqual(dummyBrands);
    });

    let apiurl = `http://localhost:5000/api/brands`;
    expect(httpMock.get).toHaveBeenCalledTimes(1);
    expect(httpMock.get).toHaveBeenCalledWith(apiurl);
  });

  it('should call getCategories method and return results', () => {
    jest.spyOn(httpMock, 'get').mockReturnValue(of(dummyCategories));

    service.getCategories().subscribe((data) => {
      expect(data.length).toBe(2);
      expect(data).toEqual(dummyCategories);
    });

    let apiurl = `http://localhost:5000/api/categories`;
    expect(httpMock.get).toHaveBeenCalledTimes(1);
    expect(httpMock.get).toHaveBeenCalledWith(`${baseUrl}/categories`);
  });
});
