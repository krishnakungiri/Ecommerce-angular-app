import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistComponent } from './wishlist.component';
import { Product } from '../../models/products-data.interface';

describe('WishlistComponent', () => {
  let component: WishlistComponent;
  let fixture: ComponentFixture<WishlistComponent>;
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishlistComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the removeFromWishlist method', () => {
    component.wishlistProducts = [product]
    component.removeFromWishlist(product);
    expect(component.wishlistProducts).toEqual([]);
  })
});
