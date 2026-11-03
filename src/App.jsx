import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import CategoryFilter from "./components/CategoryFilter";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import { getProducts } from "./api";
import "./App.css";

function App() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const fetchProducts = async () => {

      try {
        setLoading(true);
        setError("");

        const data = await getProducts(
          search,
          controller.signal
        );

        setProducts(data);

      } catch (err) {

        if (err.name !== "AbortError") {
          setError(err.message);
          setProducts([]);
        }

      } finally {

        if (!controller.signal.aborted) {
          setLoading(false);
        }

      }
    };

    fetchProducts();

    return () => controller.abort();

  }, [search]);

  const categories = [
    "All",
    ...new Set(products.map((item) => item.category))
  ];

  let filteredProducts =
    category === "All"
      ? products
      : products.filter(
          (item) => item.category === category
        );

  let sortedProducts = [...filteredProducts];

  if (sort === "low") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  if (sort === "high") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  if (sort === "rating") {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  }

  const handleAddToCart = (productId) => {

    console.log("Product Added:", productId);

    setCartCount((prev) => prev + 1);

  };

  return (
    <div>
      <Header cartcount={cartCount} />
      <main className="container">
        <h1>Shop all products</h1>
        <CategoryFilter
          category={category}
          setCategory={setCategory}
          sort={sort}
          setSort={setSort}
          categories={categories}
          search={search}
          setSearch={setSearch}
        />

        {loading ? (
          <h2 className="loading">
            Loading…
          </h2>
        ) 
        : error ? (
          <div className="error">
            <h2>Something went wrong!</h2>
            <p>{error}</p>
          </div>
        ) : (

          <>
            <p className="product-count">
              Showing {sortedProducts.length} products
            </p>

            <ProductList
              products={sortedProducts}
              onAddToCart={handleAddToCart}
            />
          </>

        )}

      </main>

      <Footer />

    </div>
  );
}
export default App;

