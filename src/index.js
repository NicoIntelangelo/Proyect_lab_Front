import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeContextProvider } from "./services/theme/theme.context";
import { NextUIProvider } from "@nextui-org/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <NextUIProvider>
        <React.StrictMode>
            <ThemeContextProvider>
                <App />
            </ThemeContextProvider>
        </React.StrictMode>
    </NextUIProvider>
);
