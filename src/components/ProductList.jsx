import ProductCard from "./ProductCard";
import "./ProductList.css";

function ProductList({ products, onAddToCart }) {

  if (products.length === 0) {
    return <h2>No products found.</h2>;
  }

  return (
    <div className="product-grid">

      {products.map((product) => (

        <ProductCard
          key={product.id}
          image={product.image}
          name={product.name}
          description={product.description}
          category={product.category}
          price={product.price}
          discount={product.discount}
          rating={product.rating}
          stock={product.stock}
          brand={product.brand}
          availability={product.availability}
          onAddToCart={() => onAddToCart(product.id)}
        />

      ))}

    </div>
  );
}

export default ProductList;



