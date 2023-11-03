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
          image="https://acdn.mitiendanube.com/stores/219/431/products/4b258e91-9688-4d38-b29b-560682df4d1a-8dd8ca11ac2f8f738e16935205241103-480-0.webp"
        />
      ))
    );
  }

  return <div className="products-grid">{productsList}</div>;
};

export default Products;
