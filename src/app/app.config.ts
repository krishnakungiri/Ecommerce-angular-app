import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { wishlistReducer } from './services/wishlist/store/wishlist.reducer';
import { cartReducer } from './services/cart/store/cart.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ wishlist: wishlistReducer, cart: cartReducer }),
  ],
};
