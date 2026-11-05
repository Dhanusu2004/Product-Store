import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const { cart, removeFromCart, updateQty, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <main className="container1">
        <h2>Your cart is empty</h2>
        <Link to="/">Go to products</Link>
      </main>
    );
  }

  return (
    <main className="container1 ">
      <h1>Your Cart</h1>

      {cart.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.name} />

          <div>
            <h3>{item.name}</h3>
            <p>Price: ₹{item.price.toLocaleString("en-IN")}</p>

            <div className="qty-box">
              <button onClick={() => updateQty(item.id, item.qty - 1)}>
                -
              </button>
              <span>{item.qty}</span>
              <button onClick={() => updateQty(item.id, item.qty + 1)}>
                +
              </button>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          </div>

          <h3 className="price">
            ₹{(item.price * item.qty).toLocaleString("en-IN")}
          </h3>
        </div>
      ))}

      <h2 className="cart-total">
        Total: ₹{cartTotal.toLocaleString("en-IN")}
      </h2>
    </main>
  );
}

export default Cart;