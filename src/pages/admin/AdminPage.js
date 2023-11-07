import React, { useContext } from "react";
import "./AdminPage.css";
import { ThemeContext } from "../../services/theme/theme.context";
import { AddProduct } from "../../components/addProduct/AddProduct";
import EditProduct from "../../components/editProduct/EditProduct";

const AdminPage = () => {
    const { theme } = useContext(ThemeContext);

    const addProductHandler = async (product) => {
        try {
            const response = await fetch("http://localhost:8080/products", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    id: 0,
                    brand: product.brand,
                    productName: product.productName,
                    category: product.category,
                    talles: product.talles,
                    price: product.price,
                    discount: product.discount,
                    image: product.image,
                    newArticle: product.newArticle,
                }),
            });

            if (response.ok) {
                const user = await response.json();
                console.log(user, response.status);
                return user;
            } else {
                throw new Error("La respuesta del servidor no fue exitosa");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const editProductHandler = async (product) => {
        try {
            const response = await fetch("http://localhost:8080/products", {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    id: product.id,
                    brand: product.brand,
                    productName: product.productName,
                    category: product.category,
                    talles: product.talles,
                    price: product.price,
                    discount: product.discount,
                    image: product.image,
                    newArticle: product.newArticle,
                }),
            });

            if (response.ok) {
                const user = await response.json();
                console.log(user, response.status);
                return user;
            } else {
                throw new Error("La respuesta del servidor no fue exitosa");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            className={
                theme === "dark"
                    ? "ap-container ap-container-dark dark"
                    : "ap-container"
            }
        >
            <div className="ap-sub-container">
                <h1 className="">AdminPage</h1>
                <AddProduct onProductAdded={addProductHandler} />
                <EditProduct onProductEdit={editProductHandler} />
            </div>
        </div>
    );
};

export default AdminPage;
