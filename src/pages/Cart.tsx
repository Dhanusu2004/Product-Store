import { Link } from "react-router-dom";
import {
  selectCartItems,
  selectCartTotal,
  removeFromCart,
  updateQty
} from "../features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

function Cart() {

  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);

  if (cart.length === 0) {
    return (
      <main className="w-[90%] max-w-[1100px] mx-auto my-[100px] min-h-[60vh]">
        <h2 className="text-2xl font-bold text-[#333] mb-2.5">
          Your cart is empty
        </h2>
        <Link
          to="/"
          className="inline-block mt-4 text-white bg-blue-600 px-[22px] py-3 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Go to products
        </Link>
      </main>
    );
  }

  return (
    <main className="w-[90%] max-w-[1100px] mx-auto my-[100px] min-h-[60vh]">

      <h1 className="text-[32px] font-bold text-[#222] mb-4">Your Cart</h1>

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 sm:gap-6 p-3 sm:p-8 mb-[18px] bg-white border border-gray-200 rounded-xl shadow-sm hover:-translate-y-0.5 hover:shadow-md transition"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-[85px] h-[85px] sm:w-[110px] sm:h-[110px] object-contain rounded-lg bg-slate-50"
          />

          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-bold text-[#222]">
              {item.name}
            </h3>
            <p className="text-sm text-[#666] my-1.5">
              Price: ₹{item.price.toLocaleString("en-IN")}
            </p>

            <div className="flex items-center gap-2.5 mt-2.5">
              <button
                onClick={() =>
                  dispatch(updateQty({ id: item.id, qty: item.qty - 1 }))
                }
                className="px-3 py-1.5 border border-gray-300 bg-white rounded-md cursor-pointer"
              >
                -
              </button>

              <span className="min-w-6 text-center font-semibold">
                {item.qty}
              </span>

              <button
                onClick={() =>
                  dispatch(updateQty({ id: item.id, qty: item.qty + 1 }))
                }
                className="px-3 py-1.5 border border-gray-300 bg-white rounded-md cursor-pointer"
              >
                +
              </button>

              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="px-3 py-1.5 bg-red-500 text-white rounded-md cursor-pointer ml-2.5"
              >
                Remove
              </button>
            </div>
          </div>

          <h3 className="w-full text-right sm:w-auto sm:p-[30px] text-lg sm:text-xl font-bold text-green-600 whitespace-nowrap">
            ₹{(item.price * item.qty).toLocaleString("en-IN")}
          </h3>
        </div>
      ))}

      <h2 className="text-right mt-[30px] p-[22px] bg-slate-100 rounded-[10px] text-green-700 text-xl sm:text-[25px] font-bold">
        Total: ₹{cartTotal.toLocaleString("en-IN")}
      </h2>

    </main>
  );
}

export default Cart;