import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Header() {

  const { cartCount } = useCart();

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-[15px] text-[#ff6b00] font-bold"
      : "text-[15px] text-white";

  return (
    <header className="bg-[#1b2b4b] text-white px-5 sm:px-[45px] py-[30px] flex justify-between items-center">

      <h2 className="text-[25px] font-bold">
        Kadai<span className="text-[#ffa500]">.</span>
      </h2>

      <nav className="hidden sm:flex gap-[30px]">
        <NavLink to="/" end className={linkClass}>
          Home
        </NavLink>

        <NavLink to="/cart" className={linkClass}>
          Cart
        </NavLink>
      </nav>

      <Link to="/cart" className="relative text-[22px]">
        <span className="absolute -top-3 -right-3 bg-[#ffa500] text-black text-xs px-[7px] py-1 rounded-full">
          {cartCount}
        </span>
      </Link>

    </header>
  );
}

export default Header;

