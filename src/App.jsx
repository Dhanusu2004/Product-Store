import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import { getProducts } from "./api";
import "./App.css";

function App() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

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

  const handleAddToCart = (product) => {

    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: 1
        }
      ]);
    }

  };

  const cartCount = cart.reduce((total, item) => total + item.qty, 0);

  return (
    <div>

      <Header cartcount={cartCount} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              products={sortedProducts}
              loading={loading}
              error={error}
              category={category}
              setCategory={setCategory}
              sort={sort}
              setSort={setSort}
              categories={categories}
              search={search}
              setSearch={setSearch}
              onAddToCart={handleAddToCart}
            />
          }
        />

        <Route
          path="/product/:id"
          element={<ProductDetail onAddToCart={handleAddToCart} />}
        />

        <Route path="/cart" element={<Cart cart={cart} />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />

    </div>
  );
}

export default App;

