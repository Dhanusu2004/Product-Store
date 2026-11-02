import React, { useState } from "react";
import Header from "./components/Header";
import products from "./data";
import CategoryFilter from "./components/CategoryFilter";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";

import "./App.css";

function App() {

  const [category, setCategory] = useState("All");

  const [sort, setSort] = useState("");

  const [cartCount, setCartCount] = useState(0);

  let filteredProducts =
    category === "All"
      ? products
      : products.filter(
          (item) => item.category === category
        );

  let sortedProducts = [...filteredProducts];
  if (sort === "low") {
    sortedProducts.sort(
      (a, b) => a.price - b.price
    );
  }
  if (sort === "high") {
    sortedProducts.sort(
      (a, b) => b.price - a.price
    );
  }

  if (sort === "rating") {
    sortedProducts.sort(
      (a, b) => b.rating - a.rating
    );
  }

  const handleAddToCart = (productId) => {

    console.log("Product Added:", productId);

    setCartCount((prevCount) => prevCount + 1);

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
        />
        <p className="product-count">
          Showing {sortedProducts.length} products
        </p>
        <ProductList
          products={sortedProducts}
          onAddToCart={handleAddToCart}
        />
      </main>
      <Footer />
    </div>
  );
}
export default App;






