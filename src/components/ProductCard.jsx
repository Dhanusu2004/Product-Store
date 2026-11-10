import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

function ProductCard({
  id,
  image,
  name,
  description,
  category,
  price,
  discount,
  rating,
  stock,
  brand,
  availability
})
{

  const dispatch = useDispatch();
  
  const inStock = stock > 0;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:-translate-y-1 transition-transform duration-300">

      <div className="h-[220px] relative bg-gray-100">

        <Link to={`/product/${id}`}>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </Link>

        {!inStock && (
          <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-[7px] rounded-md text-xs">
            Out of Stock
          </span>
        )}

      </div>

      <div className="p-[18px]">

        <p className="p-[5px]">
          {category}
        </p>

        <h3 className="text-lg font-bold mb-2.5">
          <Link to={`/product/${id}`}>{name}</Link>
        </h3>

        <p className="p-[5px]">
          Brand: {brand || "Not available"}
        </p>

        <p className="p-[5px]">
          {description}
        </p>

        <p className="text-[#f39c12] my-2.5 p-[5px]">
           {rating} / 5
        </p>

        <p className="p-[5px]">
          Discount: {discount}% OFF
        </p>

        <h2 className="text-2xl font-bold text-[#6c63ff] mb-4">
          ₹{price.toLocaleString("en-IN")}
        </h2>

        <p className="p-[5px]">
          Status: {availability}
        </p>

        <p className="p-[5px]">
          Stock: {stock}
        </p>

        <button
          disabled={!inStock}
         onClick={() => dispatch(addToCart({ id, name, price, image }))}
          className="w-full p-3 bg-[#6c63ff] text-white rounded-lg cursor-pointer disabled:bg-[#aaa] disabled:cursor-not-allowed"
        >
          {inStock ? "Add to Cart" : "Out of Stock"}
        </button>

      </div>

    </div>
  );
}

export default ProductCard;




