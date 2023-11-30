import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Radio, RadioGroup } from "@nextui-org/react";
import { ThemeContext } from "../../services/theme/theme.context";
import "./ProductDetail.css";
import BACK_END_URL from "../../assets/BackendUrl";
import { useCart } from "../../services/cartContext/cart.context";

const ProductDetail = () => {
  const [product, setProduct] = useState();
  const [talla, setTalla] = useState("s");
  const params = useParams();
  const { theme } = useContext(ThemeContext);
  const { dispatch } = useCart();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    // Verifica si el producto existe antes de agregarlo al carrito

    if (product) {
      dispatch({ type: "ADD_TO_CART", payload: product });
      navigate("/cart");
    }
  };

  useEffect(() => {
    fetch(BACK_END_URL + "/products/id/" + params.id, {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((product) => {
        setProduct(product);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params]);

  return (
    <div className={theme === "dark" ? "pd-container-dark" : "pd-container"}>
      {product ? (
        <div className="pd-info">
          <img
            src="https://acdn.mitiendanube.com/stores/219/431/products/824f0f4a-d566-4f40-812e-d2c7d9c13ac5-1910a0efe81b0c4db216935215790830-480-0.webp"
            alt="imagen de producto"
            className="pd-image"
          />
          <div className={theme === "dark" ? "pd-details dark" : "pd-details"}>
            <div className="pd-category">{product.category}</div>
            <h1 className="pd-name">
              {product.brand} {product.productName}
            </h1>
            <div className="pd-price"> ${product.price} </div>

            <p className="label-talles">Seleccione su talle</p>

            <RadioGroup
              orientation="horizontal"
              value={talla}
              onValueChange={setTalla}
              color="primary"
            >
              <Radio value="s">S</Radio>
              <Radio value="m">M</Radio>
              <Radio value="l">L </Radio>
              <Radio value="xl">XL</Radio>
            </RadioGroup>

            <Button
              className="button-add-to-cart bg-gradient-to-tr from-blue-500 to-light-blue-500 text-white shadow-lg button"
              onClick={addToCartHandler}
            >
              Agregar al carrito
            </Button>
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default ProductDetail;
