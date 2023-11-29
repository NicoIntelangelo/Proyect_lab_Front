import React from "react";
import "./CartComponent.css";
import { useCart } from "../../services/cartContext/cart.context";
import CartItemCard from "../cartItemCard/CartItemCard";
import { useContext } from "react";
import { ThemeContext } from "../../services/theme/theme.context";
import { Button } from "@nextui-org/react";

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

    // console.log(totalPrice);
    // console.log(totalQuantity);

    return (
        <div className="cart-component">
            <h2 className="cart-title">Mi Carrito</h2>

            {cart.length > 0 ? (
                <div className="cart-container">
                    <div className="cart-items-container">
                        {cart.map((product) => (
                            <div
                                className="cart-card-component"
                                key={"cart-component" + product.id}
                            >
                                <CartItemCard product={product} />
                            </div>
                        ))}
                    </div>

                    <div
                        className={
                            theme === "dark"
                                ? "total-price-container total-price-container-dark"
                                : "total-price-container"
                        }
                    >
                        <div className="title-resumen">Resumen de compra</div>

                        {totalQuantity === 1 ? (
                            <div className="title-productos">1 Producto</div>
                        ) : (
                            <div className="title-productos">
                                {totalQuantity} Productos
                            </div>
                        )}

                        <div className="total-price">Total: ${totalPrice}</div>

                        <Button className="bg-gradient-to-tr from-blue-500 to-light-blue-500 text-white shadow-lg button finish-button">
                            Comprar
                        </Button>
                    </div>
                </div>
            ) : (
                <h5 className="no-products">No hay productos en el carrito</h5>
            )}
        </div>
    );
};

export default CartComponent;
