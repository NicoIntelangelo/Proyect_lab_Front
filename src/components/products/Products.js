import ProductCard from "../productCard/ProductCard";
import "./Products.css";

const Products = ({ products, brandFilter }) => {
  var filteredProducts = [];
  var productsList = [];

  if (products.length > 0) {
    if (brandFilter.length > 0) {
      for (let i = 0; i < brandFilter.length; i++) {
        var brandProducts = products.filter((p) => p.brand === brandFilter[i]);
        filteredProducts = filteredProducts.concat(brandProducts);
      }
    } else {
      filteredProducts = [...products];
    }
    productsList = productsList.concat(
      filteredProducts.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          price={product.price}
          discount={product.discount}
          brand={product.brand}
          productName={product.productName}
          image={product.image}
        />
      ))
    );
  }

  return <div className="products-grid pb-3">{productsList}</div>;
};

export default Products;
