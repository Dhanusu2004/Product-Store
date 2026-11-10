import ProductCard from "./ProductCard";

function ProductList({ products }) {

  if (products.length === 0) {
    return <h2 className="text-2xl font-bold">No products found.</h2>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

      {products.map((product) => (

        <ProductCard
          key={product.id}
          id={product.id}
          image={product.image}
          name={product.name}
          description={product.description}
          category={product.category}
          price={product.price}
          discount={product.discount}
          rating={product.rating}
          stock={product.stock}
          brand={product.brand}
          availability={product.availability}
        />

      ))}

    </div>
  );
}

export default ProductList;



