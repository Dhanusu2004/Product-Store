import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Header.css";

function Header() {
  const { cartCount } = useCart();
  return (
    <header className="header">
      <h2 className="logo">
        Kadai<span>.</span>
      </h2>

      <nav>
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Cart
        </NavLink>
      </nav>

      <Link to="/cart" className="cart">
        <span className="cart-count">
          {cartCount}
        </span>
      </Link>
    </header>
  );
}

export default Header;


