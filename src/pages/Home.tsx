import { useEffect } from "react";
import CategoryFilter from "../components/CategoryFilter";
import PriceFilter from "../components/PriceFilter";
import ProductList from "../components/ProductList";
import {
  fetchProducts,
  selectProducts,
  selectProductsStatus,
  selectProductsError,
  selectProductsByCategory
} from "../features/products/productsSlice";
import type { PriceRange } from "../types";
import { useAppDispatch, useAppSelector } from "../store/hooks";

interface HomeProps {
  category: string;
  setCategory: (category: string) => void;
  sort: string;
  setSort: (sort: string) => void;
  search: string;
  setSearch: (search: string) => void;
  priceRange: PriceRange;
  setPriceRange: (priceRange: PriceRange) => void;
}

function Home({
  category,
  setCategory,
  sort,
  setSort,
  search,
  setSearch,
  priceRange,
  setPriceRange
}: HomeProps) {

  const dispatch = useAppDispatch();

  const searchText = search.trim();
  const query = searchText.length >= 2 ? searchText : "";

  useEffect(() => {
    const promise = dispatch(fetchProducts(query));

    return () => promise.abort();
  }, [dispatch, query]);

  const products = useAppSelector(selectProducts);
  const status = useAppSelector(selectProductsStatus);
  const error = useAppSelector(selectProductsError);

  const categoryProducts = useAppSelector((state) =>
    selectProductsByCategory(state, category)
  );

  const categories = [
    "All",
    ...new Set(products.map((item) => item.category))
  ];

  const minPrice = priceRange.min === "" ? 0 : Number(priceRange.min);
  const maxPrice = priceRange.max === "" ? Infinity : Number(priceRange.max);

  const filteredProducts = categoryProducts.filter(
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

  const loading = status === "idle" || status === "loading";

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
      ) : status === "failed" ? (
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