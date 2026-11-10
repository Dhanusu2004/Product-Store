import CategoryFilter from "../components/CategoryFilter";
import PriceFilter from "../components/PriceFilter";
import ProductList from "../components/ProductList";
import useFetch from "../hooks/useFetch";
import { BASE_URL, formatProduct } from "../api";

function Home({
  category,
  setCategory,
  sort,
  setSort,
  search,
  setSearch,
  priceRange,
  setPriceRange
}) {

  const searchText = search.trim();

  const url =
    searchText.length >= 2
      ? `${BASE_URL}/search?q=${encodeURIComponent(searchText)}`
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

  const minPrice = priceRange.min === "" ? 0 : Number(priceRange.min);
  const maxPrice = priceRange.max === "" ? Infinity : Number(priceRange.max);

  filteredProducts = filteredProducts.filter(
    (item) => item.price >= minPrice && item.price <= maxPrice
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

  return (
    <main className="max-w-[1400px] mx-auto my-9 p-4">

      <h1 className="text-2xl sm:text-3xl font-bold mb-3">
        Shop all products
      </h1>

      <CategoryFilter
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        categories={categories}
        search={search}
        setSearch={setSearch}
      />

      <PriceFilter
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />

      {loading ? (
        <h2 className="text-center p-12 text-2xl font-bold">Loading…</h2>
      ) : error ? (
        <div className="text-center text-red-500 p-8">
          <h2 className="text-2xl font-bold">Something went wrong!</h2>
          <p>{error}</p>
        </div>
      ) : (
        <>
          <p className="text-3xl font-serif p-5">
            Showing {sortedProducts.length} products
          </p>

          <ProductList products={sortedProducts} />
        </>
      )}

    </main>
  );
}

export default Home;