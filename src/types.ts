export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  discount: number;
  rating: number;
  image: string;
  images: string[];
  stock: number;
  brand: string;
  availability: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  qty: number;
}

export interface PriceRange {
  min: string;
  max: string;
}

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";
