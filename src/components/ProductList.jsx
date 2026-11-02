import ProductCard from "./ProductCard";
import "./ProductList.css";

function ProductList({ products, onAddToCart }) {

  return (
    <div className="product-grid">

      {products.length === 0 ? (

        <h2>No products found</h2>

      ) : (
        products.map((product) => (

          <ProductCard
            key={product.id}
            image={product.image}
            name={product.name}
            category={product.category}
            price={product.price}
            rating={product.rating}
            stock={product.stock}
            onAddToCart={() => onAddToCart(product.id)}
          />

        ))

      )}

    </div>
  );
}

export default ProductList;

