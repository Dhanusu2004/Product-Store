import type { Product } from "./types";

export const BASE_URL = import.meta.env.VITE_API_URL;

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

export function formatProduct(item: ApiProduct): Product {
  return {
    id: item.id,
    name: item.title,
    description: item.description,
    category: item.category,
    price: item.price,
    discount: item.discountPercentage,
    rating: item.rating,
    image: item.thumbnail,
    images: item.images,
    stock: item.stock,
    brand: item.brand || "",
    availability: item.availabilityStatus
  };
}
