import {
  createSlice,
  createAsyncThunk,
  createSelector
} from "@reduxjs/toolkit";
import { BASE_URL, formatProduct } from "../../api";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (search) => {

    const url = search
      ? `${BASE_URL}/search?q=${encodeURIComponent(search)}`
      : `${BASE_URL}?limit=10`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch products. Please try again.");
    }

    const data = await response.json();

    return data.products.map(formatProduct);
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id) => {

    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      throw new Error("Product not found.");
    }

    const data = await response.json();

    return formatProduct(data);
  }
);

const initialState = {
  items: [],
  status: "idle",         
  error: null,
  selectedProduct: null,
  detailStatus: "idle",
  detailError: null
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        if (action.meta.aborted) {
          return; 
        }
        state.status = "failed";
        state.error = action.error.message;
        state.items = [];
      })

      .addCase(fetchProductById.pending, (state) => {
        state.detailStatus = "loading";
        state.detailError = null;
        state.selectedProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.detailStatus = "succeeded";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        if (action.meta.aborted) {
          return;
        }
        state.detailStatus = "failed";
        state.detailError = action.error.message;
      });
  }
});

export const selectProducts = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;

export const selectSelectedProduct = (state) => state.products.selectedProduct;
export const selectDetailStatus = (state) => state.products.detailStatus;
export const selectDetailError = (state) => state.products.detailError;

export const selectProductsByCategory = createSelector(
  [selectProducts, (state, category) => category],
  (products, category) => {
    if (category === "All") {
      return products;
    }
    return products.filter((item) => item.category === category);
  }
);

export default productsSlice.reducer;