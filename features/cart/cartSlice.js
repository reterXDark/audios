import {createSlice} from '@reduxjs/toolkit';
import EPDProducts from './EPDProducts';

let initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        item => item.id === action.payload.id,
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity = action.payload.quantity;
      } else {
        const temp = {...action.payload, quantity: action.payload.quantity};
        state.cartItems.push(temp);
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload.id;
      state.cartItems = state.cartItems.filter(item => item.id !== itemId);
    },
    increase: (state, {payload}) => {
      const cartItem = state.cartItems.find(item => item.id === payload.id);
      cartItem.quantity = cartItem.quantity + 1;
    },
    decrease: (state, {payload}) => {
      const cartItem = state.cartItems.find(item => item.id === payload.id);
      cartItem.quantity = cartItem.quantity - 1;
    },
    clearTheCart: state => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },
    calculateTotals: state => {
      let quantity = 0;
      let total = 0;
      state.cartItems.forEach(item => {
        quantity += item.quantity;
        total += item.quantity * item.price;
      });
      state.quantity = quantity;
      state.total = total;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  clearTheCart,
  addToCart,
  calculateTotals,
  decrease,
  increase,
  removeItem,
} = cartSlice.actions;

export const totalAmountofCart = () => cartItems.length;

export default cartSlice.reducer;
