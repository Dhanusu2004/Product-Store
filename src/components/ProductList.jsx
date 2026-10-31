
import ProductCard from "./ProductCard";
import "./ProductList.css";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 2499,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
    stock: true
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 3999,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    stock: true
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 1999,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    stock: false
  },
  {
    id: 4,
    name: "Premium Backpack",
    price: 1499,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
    stock: true
  },
  {
    id: 5,
    name: "Classic Sunglasses",
    price: 999,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
    stock: true
  },
  {
    id: 6,
    name: "Digital Camera",
    price: 12999,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",
    stock: true
  }
];

function ProductList() {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          image={product.image}
          name={product.name}
          price={product.price}
          rating={product.rating}
          stock={product.stock}
        />
      ))}
    </div>
  );
}

export default ProductList;
