import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {
    Navigate,
    RouterProvider,
    createBrowserRouter,
} from "react-router-dom";

import PageNotFound from "./pages/pageNotFound/PageNotFound";
import Home from "./pages/home/Home";
import Shop from "./pages/shop/Shop";
import Register from "./pages/Register/Register";
import ProductDetail from "./components/productDetail/ProductDetail";
import MainLayout from "./components/mainLayout/MainLayout";
import AdminPage from "./pages/admin/AdminPage";

function App() {
    const router = createBrowserRouter([
        {
            element: <MainLayout />,
            children: [
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
                    path: "/detail/:id",
                    element: <ProductDetail />,
                },
                {
                    path: "/admin",
                    element: <AdminPage />,
                },
                {
                    path: "*",
                    element: <PageNotFound />,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
