import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../api";

function ProductDetail({ onAddToCart }) {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(id, controller.signal);

        setProduct(data);
        setMainImage(data.images[0]);

      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProduct();

    return () => controller.abort();

  }, [id]);

  if (loading) {
    return <h2 className="loading">Loading…</h2>;
  }

  if (error) {
    return (
      <main className="container">
        <div className="error">
          <h2>Something went wrong!</h2>
          <p>{error}</p>
        </div>
        <button onClick={() => navigate(-1)}> Back to products</button>
      </main>
    );
  }

  const inStock = product.stock > 0;

  return (
    <main className="container">

      <button className="back-btn" onClick={() => navigate(-1)}>
        Back to products
      </button>

      <div className="detail">

        <div className="detail-images">
          <img className="main-image" src={mainImage} alt={product.name} />

          <div className="thumbs">
            {product.images.map((img) => (
              <img
                key={img}
                src={img}
                alt={product.name}
                className={mainImage === img ? "active" : ""}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        <div className="detail-info">
          <p className="category">{product.category}</p>
          <h1>{product.name}</h1>
          <p>Brand: {product.brand || "Not available"}</p>
          <p>{product.description}</p>
          <p className="rating"> {product.rating} / 5</p>
          <h2>₹{product.price.toLocaleString("en-IN")}</h2>
          <p>Status: {product.availability}</p>

          <button
            disabled={!inStock}
            onClick={() => onAddToCart(product)}
          >
            {inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>

      </div>
    </main>
  );
}

export default ProductDetail;