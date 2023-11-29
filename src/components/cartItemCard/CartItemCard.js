import { useCart } from "../../services/cartContext/cart.context";
import "./CartItemCard.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../services/theme/theme.context";
import { Button } from "@nextui-org/react";

const CartItemCard = ({ product }) => {
    const { theme } = useContext(ThemeContext);
    const { dispatch } = useCart();
    const navigate = useNavigate();
    const itemDetail = "/detail/" + product.id;

    const goToDetail = () => {
        navigate(itemDetail);
    };

    const handleRemoveItem = (productId) => {
        dispatch({ type: "REMOVE_FROM_CART", payload: { id: productId } });
    };

    const handleUpdateQuantity = (productId, productQuantity, action) => {
        dispatch({
            type: "UPDATE_QUANTITY",
            payload: {
                id: productId,
                quantity: productQuantity,
                action: action,
            },
        });
    };

    return (
        <div
            className={
                theme === "dark"
                    ? "cart-item-card cart-item-card-dark"
                    : "cart-item-card"
            }
        >
            <img className="cart-item-image" alt="" src={product.image} />

            <h6 className="cart-item-title" onClick={goToDetail}>
                {product.brand} {product.productName}
            </h6>

            {product.quantity < 10 ? (
                <div className="cart-item-quantity">Cantidad:</div>
            ) : (
                <div className="cart-item-quantity-max">Máxima Cantidad</div>
            )}

            <div className="cart-item-price">
                ${product.discountAppliedPrice * product.quantity}
            </div>
            <div className="quantity-input">
                <Button
                    className={
                        "bg-gradient-to-tr from-blue-500 to-light-blue-500 text-white shadow-lg button quantity-button"
                    }
                    size="sm"
                    onClick={() =>
                        handleUpdateQuantity(
                            product.id,
                            product.quantity - 1,
                            "eliminar"
                        )
                    }
                    disabled={product.quantity > 1 ? false : true}
                >
                    -
                </Button>

                <input
                    className={
                        theme === "dark"
                            ? "quantity-input-number quantity-input-number-dark"
                            : "quantity-input-number"
                    }
                    readOnly={true}
                    value={product.quantity}
                    type="text"
                />

                <Button
                    className={
                        "bg-gradient-to-tr from-blue-500 to-light-blue-500 text-white shadow-lg button quantity-button"
                    }
                    size="sm"
                    onClick={() =>
                        handleUpdateQuantity(
                            product.id,
                            product.quantity + 1,
                            "agregar"
                        )
                    }
                    disabled={product.quantity < 10 ? false : true}
                >
                    +
                </Button>
            </div>

            <Button
                onClick={() => handleRemoveItem(product.id)}
                className="col-span-2 col-5 bg-gradient-to-tr from-blue-500 to-light-blue-500 text-white shadow-lg button cart-item-delete-button"
            >
                Eliminar
            </Button>
        </div>
    );
};

export default CartItemCard;
