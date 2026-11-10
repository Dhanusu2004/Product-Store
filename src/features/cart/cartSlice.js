import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cart")) || []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addToCart: (state, action) => {
      const product = action.payload;

      const existing = state.items.find((item) => item.id === product.id);

      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: 1
        });
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    updateQty: (state, action) => {
      const { id, qty } = action.payload;

      if (qty < 1) {
        state.items = state.items.filter((item) => item.id !== id);
        return;
      }

      const item = state.items.find((item) => item.id === id);

      if (item) {
        item.qty = qty;
      }
    }

  }
});

export const { addToCart, removeFromCart, updateQty } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.qty, 0);

export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.qty, 0);

export default cartSlice.reducer;