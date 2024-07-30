import { createAction, props } from '@ngrx/store';
import { Product } from '../../../models/products-data.interface';

export const addToWishlist = createAction(
  'addToWishlist',
  props<{ item: Product }>()
);

export const removeFromWishlist = createAction(
  'removeFromWishlist',
  props<{ item: Product }>()
);
