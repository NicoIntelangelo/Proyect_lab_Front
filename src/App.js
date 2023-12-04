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
import Cart from "./pages/cart/Cart";
import EditProduct from "./components/editProduct/EditProduct";
import { AddProduct } from "./components/addProduct/AddProduct";
import SuperAdminPage from "./pages/superAdmin/SuperAdminPage";
import Sales from "./pages/sales/Sales";
import ManageAdmins from "./components/manageAdmins/ManageAdmins";
import EditAdmin from "./components/editAdmin/EditAdmin";
import AddAdmin from "./components/addAdmin/AddAdmin";
import EditUser from "./components/editUser/EditUser";

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
                    path: "/user",
                    element: <EditUser />,
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
                    element: (
                        <AdminPage>
                            <AddProduct />
                        </AdminPage>
                    ),
                },
                {
                    path: "/admin/:id",
                    element: (
                        <AdminPage>
                            <EditProduct />
                        </AdminPage>
                    ),
                },
                {
                    path: "/superadmin",
                    element: (
                        <SuperAdminPage>
                            <ManageAdmins />
                        </SuperAdminPage>
                    ),
                },
                {
                    path: "/superadmin/:id",
                    element: (
                        <SuperAdminPage>
                            <EditAdmin />
                        </SuperAdminPage>
                    ),
                },
                {
                    path: "/superadmin/add",
                    element: (
                        <SuperAdminPage>
                            <AddAdmin />
                        </SuperAdminPage>
                    ),
                },
                {
                    path: "/cart",
                    element: <Cart />,
                },
                {
                    path: "/sales",
                    element: <Sales />,
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
