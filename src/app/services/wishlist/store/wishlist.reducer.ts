import { createReducer, on } from '@ngrx/store';
import { addToWishlist, removeFromWishlist } from './wishlist.action';
import { Product } from '../../../models/products-data.interface';
import { wishlistInitialState } from './wishlist.state';

const _wishlistReducer = createReducer(
  wishlistInitialState,
  on(addToWishlist, (state: any, action) => {
    return {
      ...state,
      wishlist: [...state.wishlist, action.item],
    };
  }),
  on(removeFromWishlist, (state: any, action) => {
    return {
      ...state,
      wishlist: state.wishlist.filter(
        (wishlistProcut: Product) => wishlistProcut.id !== action.item.id
      ),
    };
  })
);

export function wishlistReducer(state: any, action: any) {
  return _wishlistReducer(state, action);
}
