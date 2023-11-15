import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload.id);
    case "ADD_TO_CART":
      console.log(action.payload.id);
      return [
        ...state,
        {
          id: action.payload.id,
          image: action.payload.image,
          brand: action.payload.brand,
          productName: action.payload.productName,
          quantity: 1,
        },
      ];
    case "CLEAR_CART":
      return [];
    case "UPDATE_QUANTITY":
      if (action.payload.quantity === 0) {
        return state.filter((i) => i.id !== action.payload.id);
      } else {
        const cart = state.map((item) => {
          if (item.id === action.payload.id) {
            item.quantity = action.payload.quantity;
          }
          return {
            id: item.id,
            image: item.image,
            brand: item.brand,
            productName: item.productName,
            quantity: item.quantity,
          };
        });
        return cart;
      }
    default:
      return state;
  }
};

export const CartContextProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
