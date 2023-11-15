import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeContextProvider } from "./services/theme/theme.context";
import { NextUIProvider } from "@nextui-org/react";
import { RoleContextProvider } from "./services/authentication/role.context";
import { CartContextProvider } from "./services/cartContext/cart.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <NextUIProvider>
        <React.StrictMode>
            <ThemeContextProvider>
                <RoleContextProvider>
                    <CartContextProvider>
                        <App />
                    </CartContextProvider>
                </RoleContextProvider>
            </ThemeContextProvider>
        </React.StrictMode>
    </NextUIProvider>
);
