import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {

  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");

  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              category={category}
              setCategory={setCategory}
              sort={sort}
              setSort={setSort}
              search={search}
              setSearch={setSearch}
            />
          }
        />

        <Route path="/product/:id" element={<ProductDetail />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

