export const BASE_URL = "https://dummyjson.com/products";

export function formatProduct(item) {
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
    brand: item.brand,
    availability: item.availabilityStatus
  };
}