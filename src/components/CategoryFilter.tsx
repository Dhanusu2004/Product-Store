import type { ChangeEvent } from "react";

interface CategoryFilterProps {
  category: string;
  setCategory: (category: string) => void;
  sort: string;
  setSort: (sort: string) => void;
  categories: string[];
  search: string;
  setSearch: (search: string) => void;
}

function CategoryFilter({
  category,
  setCategory,
  sort,
  setSort,
  categories,
  search,
  setSearch
}: CategoryFilterProps) {

  const searchError =
    search.trim().length === 1 ? "Type at least 2 letters" : "";

  return (
    <div className="flex flex-wrap items-start gap-4 my-5">

      <div>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setSearch(e.target.value);
            setCategory("All");
          }}
          className={
            "p-3 border rounded-md min-w-[220px] bg-white " +
            (searchError ? "border-red-500" : "border-gray-300")
          }
        />

        {searchError && (
          <p className="text-sm text-red-500 mt-1">{searchError}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-2">

        {categories.map((item) => (

          <button
            key={item}
            onClick={() => setCategory(item)}
            className={
              "px-4 py-2.5 border border-gray-300 rounded-md cursor-pointer " +
              (category === item ? "bg-black text-white" : "bg-white")
            }
          >
            {item}
          </button>

        ))}

      </div>

      <select
        value={sort}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => setSort(e.target.value)}
        className="p-2.5 rounded-md border border-gray-300 bg-white"
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
