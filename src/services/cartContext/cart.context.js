import { createContext, useContext, useEffect, useReducer } from "react";
import AuthService from "../authentication/auth.service";

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case "REMOVE_FROM_CART":
            const cartFiltered = state.filter(
                (item) => item.id !== action.payload.id
            );
            if (cartFiltered[0]) {
                localStorage.setItem("Cart", JSON.stringify(cartFiltered));
                return cartFiltered;
            } else {
                localStorage.removeItem("Cart");
                return cartFiltered;
            }

        case "ADD_TO_CART":
            const newItem = action.payload;

            // Buscar si el elemento ya existe en el carrito
            const existingItemIndex = state.findIndex(
                (item) => item.id === newItem.id
            );

            if (existingItemIndex !== -1) {
                // El elemento ya está en el carrito, aumentar la cantidad
                const updatedState = [...state];
                updatedState[existingItemIndex] = {
                    ...updatedState[existingItemIndex],
                    quantity: updatedState[existingItemIndex].quantity + 1,
                };

                localStorage.setItem("Cart", JSON.stringify(updatedState));
                return updatedState;
            } else {
                // El elemento no está en el carrito, agregarlo
                const newCartItem = {
                    id: newItem.id,
                    image: newItem.image,
                    brand: newItem.brand,
                    price: newItem.price,
                    discount: newItem.discount,
                    discountAppliedPrice:
                        newItem.price -
                        (newItem.price * newItem.discount) / 100,
                    productName: newItem.productName,
                    quantity: 1,
                };

                const newState = [...state, newCartItem];
                localStorage.setItem("Cart", JSON.stringify(newState));
                return newState;
            }

        case "LOAD_CART":
            var cartLoaded = Object.values(action.payload);

            var cart = cartLoaded.map((item) => {
                return {
                    id: item.id,
                    image: item.image,
                    brand: item.brand,
                    price: item.price,
                    discount: item.discount,
                    discountAppliedPrice: item.discountAppliedPrice,
                    productName: item.productName,
                    quantity: item.quantity,
                };
            });
            return cart;
        case "CLEAR_CART":
            localStorage.removeItem("Cart");
            return [];
        case "UPDATE_QUANTITY":
            var cartUpdated = state.map((item) => {
                if (item.id === action.payload.id) {
                    item.quantity = action.payload.quantity;
                }
                return {
                    id: item.id,
                    image: item.image,
                    brand: item.brand,
                    price: item.price,
                    discount: item.discount,
                    discountAppliedPrice: item.discountAppliedPrice,
                    productName: item.productName,
                    quantity: item.quantity,
                };
            });
            localStorage.setItem("Cart", JSON.stringify(cartUpdated));
            return cartUpdated;
        default:
            return state;
    }
};

export const CartContextProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, []);
    const authService = new AuthService();
    const isLoggedIn = authService.isLoggedIn();
    //console.log(isLoggedIn);

    const loadCartFromStorage = () => {
        const savedCart = localStorage.getItem("Cart");
        if (savedCart) {
            dispatch({ type: "LOAD_CART", payload: JSON.parse(savedCart) });
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            // Cuando el componente se monta, carga el carrito desde el localStorage
            loadCartFromStorage();
        }
    }, [isLoggedIn]);

    return (
        <CartContext.Provider value={{ cart, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};
