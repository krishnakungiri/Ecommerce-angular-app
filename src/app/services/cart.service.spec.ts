import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { CartProduct, Product } from '../models/products-data.interface';

describe('CartService', () => {
  let service: CartService;
  const cart: CartProduct[] = [
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
      quantity: 1,
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
      quantity: 1,
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

  const getDataFromCart = () => {
    return localStorage.getItem('cartProducts');
  }


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartService],
    });
    service = TestBed.inject(CartService);

  });
  afterEach(() => {
    localStorage.clear();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load products from the cart', () => {
    let loadedCart = service.loadCart()
    expect(loadedCart).toEqual([]);

    service.saveCart(cart);
    loadedCart = service.loadCart();

    expect(loadedCart).toEqual(cart);
  })

  it('should save cart products to localStorage', () => {
    service.saveCart(cart);

    expect(getDataFromCart()).toEqual(JSON.stringify(cart));
  });

  it('should add product to the cart localStorage', () => {
    service.addToCart(product)

    expect(getDataFromCart()).toEqual(JSON.stringify([{ ...product, quantity: 1 }]));
  })

  it('should increase the product quantity on adding same product to the cart localStorage', () => {
    service.addToCart(product);
    service.addToCart(product);

    expect(getDataFromCart()).toEqual(JSON.stringify([{ ...product, quantity: 2 }]));
  })

  it('should update the quantity of existing cart product in localstorage', () => {
    service.addToCart(product);

    const existingCart = service.getCart();
    service.updateQuantity(existingCart[0], 4)

    expect(getDataFromCart()).toEqual(JSON.stringify([{ ...product, quantity: 4 }]))
  })

  it('should remove the product from the existing cart product in localstorage if the new quantity is 0 ', () => {
    service.addToCart(product);
    const existingCart = service.getCart();

    service.updateQuantity(existingCart[0], 0)

    expect(getDataFromCart()).toEqual(JSON.stringify([]))
  })

  it('should remove the product from the cart localStorage', () => {
    service.addToCart(product);
    const existingCart = service.getCart();
    service.removeFromCart(existingCart[0]);

    expect(getDataFromCart()).toEqual(JSON.stringify([]))
  })
});
