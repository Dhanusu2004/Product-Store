import CategoryFilter from "../components/CategoryFilter";
import ProductList from "../components/ProductList";
import useFetch from "../hooks/useFetch";
import { BASE_URL, formatProduct } from "../api";

function Home({
  category,
  setCategory,
  sort,
  setSort,
  search,
  setSearch
}) {

  const url = search.trim()
    ? `${BASE_URL}/search?q=${encodeURIComponent(search)}`
    : `${BASE_URL}?limit=10`;

  const { data, loading, error } = useFetch(url);

  const products = data ? data.products.map(formatProduct) : [];

  const categories = [
    "All",
    ...new Set(products.map((item) => item.category))
  ];

  let filteredProducts =
    category === "All"
      ? products
      : products.filter((item) => item.category === category);

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

  return (
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
        <h2 className="loading">Loading…</h2>
      ) : error ? (
        <div className="error">
          <h2>Something went wrong!</h2>
          <p>{error}</p>
        </div>
      ) : (
        <>
          <p className="product-count">
            Showing {sortedProducts.length} products
          </p>

          <ProductList products={sortedProducts} />
        </>
      )}
    </main>
  );
}

export default Home;