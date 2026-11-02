import "./ProductCard.css";
function ProductCard({
  image,
  name,
  category,
  price,
  rating,
  stock,
  onAddToCart
}) {
  return (
    <div className="product-card">

      <div className="image-container">

        <img src={image} alt={name} />

        {!stock && (
          <span className="stock-badge">
            Out of Stock
          </span>
        )}

      </div>

      <div className="product-info">

        <p>{category}</p>

        <h3>{name}</h3>

        <p className="rating">
          {rating} / 5
        </p>

        <h2>
          ₹{price.toLocaleString("en-IN")}
        </h2>

        <button
          disabled={!stock}
          onClick={onAddToCart}
        >
          {stock ? "Add to Cart" : "Unavailable"}
        </button>

      </div>

    </div>
  );
}
export default ProductCard;


