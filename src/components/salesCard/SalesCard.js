import React from "react";
import "./SalesCard.css";
import { format } from "date-fns";
import { ThemeContext } from "../../services/theme/theme.context";
import { useContext } from "react";

const SalesCard = ({ sale }) => {
    const { theme } = useContext(ThemeContext);

    const fechaCompra = new Date(sale.saleDate);
    const fechaFormateada = format(fechaCompra, "dd/MM/yyyy");

    console.log(sale.products);

    return (
        <div
            className={
                theme === "dark"
                    ? "sale-card-container sale-card-container-dark"
                    : "sale-card-container"
            }
        >
            <img
                className="sale-card-image"
                alt=""
                src={sale.products[0].image}
            />
            <div className="sale-card-price">Precio total: ${sale.price}</div>
            <div className="sale-card-p-quantity">
                Cantidad de Productos: {sale.products.length}
            </div>
            <div className="sale-card-date">{fechaFormateada}</div>
        </div>
    );
};

export default SalesCard;
