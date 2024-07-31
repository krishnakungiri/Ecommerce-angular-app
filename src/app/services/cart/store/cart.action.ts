import { createAction, props } from '@ngrx/store';
import { CartProduct, Product } from '../../../models/products-data.interface';

export const addToCart = createAction('addToCart', props<{ item: Product }>());

export const updateCart = createAction(
  'updateCart',
  props<{ cartItem: CartProduct; quantity: number }>()
);

export const removeFromCart = createAction(
  'removeFromCart',
  props<{ cartItem: CartProduct }>()
);
