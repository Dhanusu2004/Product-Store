import CategoryFilter from "../components/CategoryFilter";
import ProductList from "../components/ProductList";

function Home({
  products,
  loading,
  error,
  category,
  setCategory,
  sort,
  setSort,
  categories,
  search,
  setSearch,
  onAddToCart
}) {
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
            Showing {products.length} products
          </p>

          <ProductList
            products={products}
            onAddToCart={onAddToCart}
          />
        </>
      )}
    </main>
  );
}

export default Home;