import React from "react";
import "./CartComponent.css";
import { useCart } from "../../services/cartContext/cart.context";
import CartItemCard from "../cartItemCard/CartItemCard";
import { Button } from "react-bootstrap";
import { Divider } from "@nextui-org/react";
import { useContext } from "react";
import { ThemeContext } from "../../services/theme/theme.context";

const CartComponent = () => {
  const { theme } = useContext(ThemeContext);
  const { cart } = useCart();

  var totalQuantity = 0;
  cart.map((product) => (totalQuantity = totalQuantity + product.quantity));

  var totalPrice = 0;
  cart.map(
    (product) =>
      (totalPrice =
        totalPrice + product.discountAppliedPrice * product.quantity)
  );

  console.log(totalPrice);
  console.log(totalQuantity);

  return (
    <div className="cart-component">
      <h2 className="cart-title">Carrito</h2>
      {console.log(cart)}
      {cart.length > 0 ? (
        <div className="cart-container">
          <div className="cart-items-container">
            <ul
              className={
                theme !== "dark"
                  ? "cart-items-column"
                  : "cart-items-column-dark"
              }
            >
              <Divider className="opacity-60 h-[0.5px]" />
              {cart.map((product) => (
                <div key={"cart-component" + product.id}>
                  <CartItemCard product={product} />
                  <Divider className="opacity-60 h-[0.5px]" />
                </div>
              ))}
            </ul>
          </div>
          <div className="total-price-container">
            <div className="title-resumen">Resumen de compra</div>
            {totalQuantity === 1 ? (
              <div className="title-productos">1 Producto</div>
            ) : (
              <div className="title-productos">Productos ({totalQuantity})</div>
            )}
            <div className="total-price">Total: ${totalPrice}</div>

            <Button className="finish-button">Comprar</Button>
          </div>
        </div>
      ) : (
        <h5 className="no-products">No hay productos en el carrito</h5>
      )}
    </div>
  );
};

export default CartComponent;
