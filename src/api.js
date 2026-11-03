
const BASE_URL = "https://dummyjson.com/products";

export async function getProducts(search = "", signal) {

  const url = search.trim()
    ? `${BASE_URL}/search?q=${encodeURIComponent(search)}`
    : `${BASE_URL}?limit=10`;

  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("Failed to fetch products. Please try again.");
  }

  const result = await response.json();

  return result.products.map((item) => ({
    id: item.id,
    name: item.title,
    description: item.description,
    category: item.category,
    price: item.price,
    discount: item.discountPercentage,
    rating: item.rating,
    image: item.thumbnail,
    stock: item.stock,
    brand: item.brand,
    availability: item.availabilityStatus
  }));
}
