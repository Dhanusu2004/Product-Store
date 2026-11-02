import "./Header.css";
function Header({ cartcount }) {
  return (
    <header className="header">
      <h2 className="logo">
        Kadai<span>.</span>
      </h2>
      <nav>
        <a href="#">Home</a>
        <a href="#">Shop</a>
        <a href="#">Offers</a>
        <a href="#">Contact</a>
      </nav>
      <div className="cart">
      DB
        <span className="cart-count">
          {cartcount}
        </span>
      </div>
    </header>
  );
}
export default Header;



