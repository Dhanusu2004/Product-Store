import "./Header.css";
function Header() {
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
        <span>3</span>
      </div>

    </header>
  );
}
export default Header;
