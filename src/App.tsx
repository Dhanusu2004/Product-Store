import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import type { PriceRange } from "./types";

function App() {

  const [category, setCategory] = useState<string>("All");
  const [sort, setSort] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: "", max: "" });

  return (
    <div className="min-h-screen bg-[#d8e3f3] text-[#1b2b4b]">

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
              priceRange={priceRange}
              setPriceRange={setPriceRange}
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