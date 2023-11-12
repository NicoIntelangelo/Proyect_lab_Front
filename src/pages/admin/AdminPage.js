import React, { useContext, useState } from "react";
import "./AdminPage.css";
import { ThemeContext } from "../../services/theme/theme.context";
import { AddProduct } from "../../components/addProduct/AddProduct";
import EditProduct from "../../components/editProduct/EditProduct";

const AdminPage = () => {
    const { theme } = useContext(ThemeContext);
    const [postProductResponse, setPostProductResponse] = useState(0);

    const addProductHandler = async (product) => {
        try {
            const response = await fetch("https://localhost:7254/products", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    id: 0,
                    brand: product.brand,
                    productName: product.productName,
                    category: product.category,
                    sizes: product.sizes,
                    price: product.price,
                    discount: product.discount,
                    image: product.image,
                    isNewArticle: product.isNewArticle,
                }),
            });

            if (response.status === 201) {
                const product = await response.json();
                console.log(product, response.status);
                setPostProductResponse(response.status);
                return product;
            } else {
                throw new Error("La respuesta del servidor no fue exitosa");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const editProductHandler = async (product) => {
        try {
            const response = await fetch("https://localhost:7254/products", {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    id: product.id,
                    brand: product.brand,
                    productName: product.productName,
                    category: product.category,
                    sizes: product.sizes,
                    price: product.price,
                    discount: product.discount,
                    image: product.image,
                    isNewArticle: product.isNewArticle,
                }),
            });

            if (response.ok) {
                const product = await response.json();
                console.log(product, response.status);
                return product;
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
                <AddProduct
                    onProductAdded={addProductHandler}
                    postProductResponse={postProductResponse}
                />
                <EditProduct onProductEdit={editProductHandler} />
            </div>
        </div>
    );
};

export default AdminPage;
