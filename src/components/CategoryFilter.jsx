import "./CategoryFilter.css";
function CategoryFilter({
  category,
  setCategory,
  sort,
  setSort
}) {
  return (
    <div className="filters">
      <div className="categories">
        <button className={category === "All" ? "active" : ""}
          onClick={() => setCategory("All")}
        >
          All
        </button>
        <button
          className={category === "Electronics" ? "active" : ""}
          onClick={() => setCategory("Electronics")}
        >
          Electronics
        </button>

        <button
          className={category === "Fashion" ? "active" : ""}
          onClick={() => setCategory("Fashion")}
        >
          Fashion
        </button>
        <button
          className={category === "Home" ? "active" : ""}
          onClick={() => setCategory("Home")}
        >
          Home
        </button>
      </div>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="">Default</option>
        <option value="low">Sort: Price low to high</option>
        <option value="high">Price high to low</option>
        <option value="rating">Top Rated</option>
      </select>
    </div>
  );
}
export default CategoryFilter;

