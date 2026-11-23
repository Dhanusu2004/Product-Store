import {
  createSlice,
  createAsyncThunk,
  createSelector
} from "@reduxjs/toolkit";
import { BASE_URL, formatProduct } from "../../api";
import type { Product, RequestStatus } from "../../types";
import type { RootState } from "../../store/store";

interface ProductsState {
  items: Product[];
  status: RequestStatus;
  error: string | null;
  selectedProduct: Product | null;
  detailStatus: RequestStatus;
  detailError: string | null;
}

interface ApiProductsResponse {
  products: ApiProduct[];
}

interface ApiProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  thumbnail: string;
  images: string[];
  stock: number;
  brand?: string;
  availabilityStatus: string;
}

export const fetchProducts = createAsyncThunk<Product[], string>(
  "products/fetchProducts",
  async (search) => {

    const url = search
      ? `${BASE_URL}/search?q=${encodeURIComponent(search)}`
      : `${BASE_URL}?limit=10`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch products. Please try again.");
    }

    const data = await response.json() as ApiProductsResponse;

    return data.products.map(formatProduct);
  }
);

export const fetchProductById = createAsyncThunk<Product, string>(
  "products/fetchProductById",
  async (id) => {

    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      throw new Error("Product not found.");
    }

    const data = await response.json() as ApiProduct;

    return formatProduct(data);
  }
);

const initialState: ProductsState = {
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
        state.error = action.error.message ?? null;
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
        state.detailError = action.error.message ?? null;
      });
  }
});

export const selectProducts = (state: RootState) => state.products.items;
export const selectProductsStatus = (state: RootState) => state.products.status;
export const selectProductsError = (state: RootState) => state.products.error;

export const selectSelectedProduct = (state: RootState) => state.products.selectedProduct;
export const selectDetailStatus = (state: RootState) => state.products.detailStatus;
export const selectDetailError = (state: RootState) => state.products.detailError;

export const selectProductsByCategory = createSelector(
  [selectProducts, (_state: RootState, category: string) => category],
  (products, category) => {
    if (category === "All") {
      return products;
    }
    return products.filter((item) => item.category === category);
  }
);

export default productsSlice.reducer;