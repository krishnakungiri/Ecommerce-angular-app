import { TestBed } from '@angular/core/testing';

import { WishlistService } from './wishlist.service';
import { Product } from '../models/products-data.interface';

describe('WishlistService', () => {
  let service: WishlistService;
  const wishlist: Product[] = [
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
    {
      id: 3,
      name: 'Samsung 40',
      price: 5000,
      rating: 3.5,
      categoryId: 3,
      description: '40-inch Samsung TV with vibrant display.',
      brandId: 3,
      image:
        'https://rukminim2.flixcart.com/image/312/312/xif0q/television/x/8/a/-original-imagttjpuyzsbzud.jpeg?q=70',
    },
  ];
  const product: Product = {
    "id": 6,
    "name": "OnePlus 9",
    "price": 10000,
    "rating": 2,
    "categoryId": 1,
    "description": "OnePlus smartphone with fast performance.",
    "brandId": 6,
    "image": "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/l/7/i/-original-imaggceejthk79fq.jpeg?q=70"
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WishlistService],
    });
    service = TestBed.inject(WishlistService);
  });

  const getDataFromWishlist = () => {
    return localStorage.getItem('wishlistProducts');
  }

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load products from the wishlist', () => {
    let loadedWishlist = service.loadWishlist();
    expect(loadedWishlist).toEqual([]);

    service.saveWishlist(wishlist);
    loadedWishlist = service.loadWishlist();

    expect(loadedWishlist).toEqual(wishlist);
  });

  it('should save products to wishlist', () => {
    service.addToWishlist(product);

    expect(getDataFromWishlist()).toEqual(JSON.stringify([product]));
  });

  it('should remove the product from the wishlist localStorage', () => {
    service.addToWishlist(product);
    const existingWishlist = service.getWishlist();
    service.removeFromWishlist(existingWishlist[0]);

    expect(getDataFromWishlist()).toEqual(JSON.stringify([]))
  })

});
