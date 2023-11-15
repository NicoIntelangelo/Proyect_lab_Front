import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeContextProvider } from "./services/theme/theme.context";
import { NextUIProvider } from "@nextui-org/react";
import { CartContextProvider } from "./services/cartContext/cart.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <NextUIProvider>
    <React.StrictMode>
      <ThemeContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </ThemeContextProvider>
    </React.StrictMode>
  </NextUIProvider>
);
