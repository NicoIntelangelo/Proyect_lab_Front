import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NextUIProvider } from "@nextui-org/react";

import {
    Navigate,
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";

import PageNotFound from "./pages/pageNotFound/PageNotFound";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Shop from "./pages/shop/Shop";
import Register from "./pages/Register/Register";

function App() {
    const router = createBrowserRouter([
        { path: "/", element: <Navigate to="/home" /> },
        {
            path: "/ingresar",
            element: <Register />,
        },
        {
            path: "/home",
            element: <Home />,
        },
        {
            path: "/shop/:category",
            element: <Shop />,
        },
        {
            path: "*",
            element: <PageNotFound />,
        },
    ]);

    return (
        <div>
            <NextUIProvider>
                <Header />
                <RouterProvider router={router} />
            </NextUIProvider>
        </div>
    );
}

export default App;
