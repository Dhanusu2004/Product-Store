import { Link } from "react-router-dom";
import "./Cart.css";
function Cart({ cart }) {

  if (cart.length === 0) {
    return (
      <main className="container1">
        <h2>Your cart is empty</h2>
        <Link to="/">Go to products</Link>
      </main>
    );
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <main className="container1 ">
      <h1>Your Cart</h1>

      {cart.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.name} />

          <div>
            <h3>{item.name}</h3>
            <p>Price: ₹{item.price.toLocaleString("en-IN")}</p>
            <p>Qty: {item.qty}</p>
          </div>

          <h3 className="price">
            ₹{(item.price * item.qty).toLocaleString("en-IN")}
          </h3>
        </div>
      ))}

      <h2 className="cart-total">
        Total: ₹{total.toLocaleString("en-IN")}
      </h2>
    </main>
  );
}

export default Cart;