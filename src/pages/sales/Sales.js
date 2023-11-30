import React from "react";
import { useState } from "react";
import AuthService from "../../services/authentication/auth.service";
import { useEffect } from "react";
import SalesCard from "../../components/salesCard/SalesCard";
import "./Sales.css";
import { ThemeContext } from "../../services/theme/theme.context";
import { useContext } from "react";
import Spinner1 from "../../components/spinner/Spinner1";

const Sales = () => {
    const { theme } = useContext(ThemeContext);
    const authService = new AuthService();
    const [sales, setSales] = useState([]);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const response = await fetch("https://localhost:7254/sale", {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${
                            authService.getSession().token
                        }`,
                    },
                });

                if (!response.ok) {
                    throw new Error(
                        `Error al obtener datos: ${response.status}`
                    );
                }

                const products = await response.json();
                if (isMounted) {
                    setSales(products);
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (authService.isLoggedIn() === true) {
            fetchData();
        }

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div
            className={
                theme === "dark"
                    ? "sale-container sale-container-dark"
                    : "sale-container"
            }
        >
            <h2 className="sale-cart-title">Mis Compras</h2>
            {sales.length > 0 ? (
                <div className="sale-sub-container">
                    {sales.map((sale) => (
                        <div key={sale.saleId}>
                            <SalesCard sale={sale} />
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    <Spinner1 />
                    <p>No hay compras disponibles</p>
                    <p>por el momento</p>
                </>
            )}
        </div>
    );
};

export default Sales;
