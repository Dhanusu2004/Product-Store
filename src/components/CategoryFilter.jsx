import "./CategoryFilter.css";
function CategoryFilter() {
  return (
    <div className="filters">
      <div className="categories">
        <button className="active">All</button>
        <button>Electronics</button>
        <button>Fashion</button>
        <button>Home</button>
      </div>
      <select defaultValue="low">
        <option value="low">Sort: Price low to high</option>
        <option value="high">Price high to low</option>
        <option value="rating">Top Rated</option>
      </select>
    </div>
  );
}
export default CategoryFilter;
