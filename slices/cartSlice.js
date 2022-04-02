import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index > -1) {
        state.cartItems[index].quantity += 1;
      } else {
        state.cartItems = [...state.cartItems, action.payload];
      }
    },
    removeFromCart: (state, action) => {
      const filteredItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      state.cartItems = [...filteredItems];
    },
    increaseQuantity: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      state.cartItems[index].quantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      state.cartItems[index].quantity -= 1;
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;

export const selectTotal = (state) =>
  state.cart.cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
export default cartSlice.reducer;
