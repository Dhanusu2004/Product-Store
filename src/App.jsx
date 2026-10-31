
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import "./App.css";
function App() {
  return (
    <>
      <Header />
      <main className="container">
        <h1>Shop all products</h1>
        <p className="subtitle">
          Showing 6 products
        </p>
        <CategoryFilter />
        <ProductList />
      </main>
      <Footer />
    </>
  );
}
export default App;
