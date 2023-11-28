import React, { useContext } from "react";
import { ThemeContext } from "../../services/theme/theme.context";
import "./Cart.css";
import CartComponent from "../../components/cartComponent/CartComponent";

const Cart = () => {
  const { theme } = useContext(ThemeContext);
  console.log("cart");

  return (
    <>
      <div className={theme === "dark" ? "cart-dark py-1" : "light py-1"}>
        <CartComponent />
      </div>
    </>
  );
};

export default Cart;
