import {configureStore, combineReducers} from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';

const Store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

export default Store;
