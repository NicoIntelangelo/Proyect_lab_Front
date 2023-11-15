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

  console.log(cart);

  return (
    <div>
      <h2 className="text-center">Carrito</h2>
      {cart.length > 0 ? (
        <div className="text-center">
          <ul
            className={
              theme !== "dark" ? "cart-items-column" : "cart-items-column-dark"
            }
          >
            <Divider className="opacity-60 h-[0.5px]" />
            {cart.map((product) => (
              <>
                <CartItemCard
                  key={"cart-component" + product.id}
                  product={product}
                />
                <Divider className="opacity-60 h-[0.5px]" />
              </>
            ))}
          </ul>
          <Button className="my-4">Comprar Productos</Button>
        </div>
      ) : (
        <h5 className="text-center py-32">No hay productos en el carrito</h5>
      )}
    </div>
  );
};

export default CartComponent;
