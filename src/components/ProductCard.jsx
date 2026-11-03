import "./ProductCard.css";
function ProductCard({
  image,
  name,
  description,
  category,
  price,
  discount,
  rating,
  stock,
  brand,
  availability,
  onAddToCart
}) 
{

  const inStock = stock > 0;

  return (
    <div className="product-card">

      <div className="image-container">

        <img src={image} alt={name} />

        {!inStock && (
          <span className="stock-badge">
            Out of Stock
          </span>
        )}

      </div>

      <div className="product-info">

        <p className="category">
          {category}
        </p>

        <h3>{name}</h3>

        <p className="brand">
          Brand: {brand || "Not available"}
        </p>

        <p className="description">
          {description}
        </p>

        <p className="rating">
           {rating} / 5
        </p>

        <p className="discount">
          Discount: {discount}% OFF
        </p>

        <h2>
          ₹{price.toLocaleString("en-IN")}
        </h2>

        <p className="availability">
          Status: {availability}
        </p>

        <p>
          Stock: {stock}
        </p>

        <button
          disabled={!inStock}
          onClick={onAddToCart}
        >
          {inStock ? "Add to Cart" : "Out of Stock"}
        </button>

      </div>

    </div>
  );
}

export default ProductCard;




