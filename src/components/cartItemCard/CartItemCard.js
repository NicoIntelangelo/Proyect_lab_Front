import { Button } from "react-bootstrap";
import { useCart } from "../../services/cartContext/cart.context";
import "./CartItemCard.css";

const CartItemCard = ({ product }) => {
    const { dispatch } = useCart();

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
        <div className="cart-item-card">
            <img className="cart-item-image" alt="" src={product.image} />
            <div className="cart-item-title">
                <h3>
                    {product.brand} {product.productName}
                </h3>
            </div>
            <div className="cart-item-quantity">
                <label>Cantidad: {product.quantity} </label>
            </div>

            <div className="cart-item-add-one-button">
                <Button
                    onClick={() =>
                        handleUpdateQuantity(
                            product.id,
                            product.quantity + 1,
                            "agregar"
                        )
                    }
                >
                    Agregar 1
                </Button>
            </div>
            <div className="cart-item-minus-one-button">
                <Button
                    onClick={() =>
                        handleUpdateQuantity(
                            product.id,
                            product.quantity - 1,
                            "eliminar"
                        )
                    }
                >
                    Eliminar 1
                </Button>
            </div>
            <div className="cart-item-delete-button">
                <Button onClick={() => handleRemoveItem(product.id)}>
                    Eliminar
                </Button>
            </div>
        </div>
    );
};

export default CartItemCard;
