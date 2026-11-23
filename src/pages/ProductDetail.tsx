import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchProductById,
  selectSelectedProduct,
  selectDetailStatus,
  selectDetailError
} from "../features/products/productsSlice";
import { addToCart } from "../features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

function ProductDetail() {

  const { id = "" } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const product = useAppSelector(selectSelectedProduct);
  const status = useAppSelector(selectDetailStatus);
  const error = useAppSelector(selectDetailError);

  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const promise = dispatch(fetchProductById(id));

    return () => promise.abort();
  }, [dispatch, id]);

  if (status === "failed") {
    return (
      <main className="max-w-[1400px] mx-auto my-9 p-4">
        <div className="text-center text-red-500 p-8">
          <h2 className="text-2xl font-bold">Something went wrong!</h2>
          <p>{error}</p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-md cursor-pointer"
        >
          Back to products
        </button>
      </main>
    );
  }

  if (status !== "succeeded" || !product || String(product.id) !== id) {
    return <h2 className="text-center p-12 text-2xl font-bold">Loading…</h2>;
  }

  const mainImage = product.images.includes(selectedImage)
    ? selectedImage
    : product.images[0];

  const inStock = product.stock > 0;

  return (
    <main className="max-w-[1400px] mx-auto my-9 p-4">

      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-white border border-gray-300 rounded-md cursor-pointer"
      >
        Back to products
      </button>

      <div className="flex flex-wrap gap-8">

        <div className="flex-1 min-w-[280px]">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full max-h-[400px] object-contain"
          />

          <div className="flex gap-2 mt-2">
            {product.images.map((img) => (
              <img
                key={img}
                src={img}
                alt={product.name}
                onClick={() => setSelectedImage(img)}
                className={
                  "w-[60px] h-[60px] object-cover border-2 cursor-pointer " +
                  (mainImage === img ? "border-[#ff6b00]" : "border-transparent")
                }
              />
            ))}
          </div>
        </div>

        <div className="flex-1 min-w-[280px]">
          <p className="uppercase text-sm text-slate-500">{product.category}</p>
          <h1 className="text-3xl font-bold my-2">{product.name}</h1>
          <p className="my-2">Brand: {product.brand || "Not available"}</p>
          <p className="my-2">{product.description}</p>
          <p className="my-2 text-[#f39c12]"> {product.rating} / 5</p>
          <h2 className="text-2xl font-bold text-[#6c63ff] my-3">
            ₹{product.price.toLocaleString("en-IN")}
          </h2>
          <p className="my-2">Status: {product.availability}</p>

          <button
            disabled={!inStock}
            onClick={() => dispatch(addToCart(product))}
            className="mt-2 px-6 py-3 bg-[#6c63ff] text-white rounded-lg cursor-pointer disabled:bg-[#aaa] disabled:cursor-not-allowed"
          >
            {inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>

      </div>
    </main>
  );
}

export default ProductDetail;