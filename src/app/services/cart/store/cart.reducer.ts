import { createReducer, on } from '@ngrx/store';
import { cartInitialState } from './cart.state';
import { addToCart, removeFromCart, updateCart } from './cart.action';
import { CartProduct } from '../../../models/products-data.interface';

const _cartReducer = createReducer(
  cartInitialState,
  on(addToCart, (state: any, action) => {
    const isExistingProduct = state.cart.find(
      (item: CartProduct) => item.id === action.item.id
    );
    if (!isExistingProduct) {
      return {
        ...state,
        cart: [...state.cart, { ...action.item, quantity: 1 }],
      };
    }
    return {
      ...state,
      cart: [...state.cart],
    };
  }),
  on(updateCart, (state: any, action) => {
    const productToUpdate = state.cart.find(
      (item: CartProduct) => item.id == action.cartItem.id
    );
    if (productToUpdate && action.quantity > 0) {
      productToUpdate.quantity = action.quantity;
      return {
        ...state,
        cart: [...state.cart],
      };
    } else if (productToUpdate && action.quantity === 0) {
      return {
        ...state,
        cart: state.cart.filter(
          (cartProduct: CartProduct) => cartProduct.id !== action.cartItem.id
        ),
      };
    }
  }),
  on(removeFromCart, (state: any, action) => {
    return {
      ...state,
      cart: state.cart.filter(
        (cartProduct: CartProduct) => cartProduct.id !== action.cartItem.id
      ),
    };
  })
);

export function cartReducer(state: any, action: any) {
  return _cartReducer(state, action);
}
