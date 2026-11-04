import { Link, NavLink } from "react-router-dom";
import "./Header.css";

function Header({ cartcount }) {
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
          {cartcount}
        </span>
      </Link>
    </header>
  );
}

export default Header;


