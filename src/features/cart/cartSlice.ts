import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, Product } from "../../types";
import type { RootState } from "../../store/store";

interface CartState {
  items: CartItem[];
}

function loadCart(): CartItem[] {
  const storedCart = localStorage.getItem("cart");
  if (!storedCart) return [];

  try {
    return JSON.parse(storedCart) as CartItem[];
  } catch {
    return [];
  }
}

const initialState: CartState = {
  items: loadCart()
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addToCart: (state, action: PayloadAction<Pick<Product, "id" | "name" | "price" | "image">>) => {
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

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    updateQty: (state, action: PayloadAction<{ id: number; qty: number }>) => {
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

export const selectCartItems = (state: RootState) => state.cart.items;

export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.qty, 0);

export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((total, item) => total + item.price * item.qty, 0);

export default cartSlice.reducer;