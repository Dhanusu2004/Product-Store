function CategoryFilter({
  category,
  setCategory,
  sort,
  setSort,
  categories,
  search,
  setSearch
}) {

  return (
    <div className="filters">

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCategory("All");
        }}
      />

      <div className="category-buttons">

        {categories.map((item) => (

          <button
            key={item}
            className={
              category === item ? "active" : ""
            }
            onClick={() => setCategory(item)}
          >
            {item}
          </button>

        ))}

      </div>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="">Sort Products</option>
        <option value="low">Price: Low to High</option>
        <option value="high">Price: High to Low</option>
        <option value="rating">Top Rated</option>
      </select>

    </div>
  );
}

export default CategoryFilter;
