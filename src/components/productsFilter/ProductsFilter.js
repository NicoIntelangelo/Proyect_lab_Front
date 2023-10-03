import React from "react";
import "./ProductsFilter.css";

import { CheckboxGroup, Checkbox } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../services/theme/theme.context";

const ProductsFilter = ({ brand, setBrand }) => {
    const params = useParams();
    const { theme } = useContext(ThemeContext);

    function capitalize(str) {
        return str
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }
    const categoria = capitalize(params.category);

    return (
        <div class={theme === "dark" ? "dark" : "light"}>
            <div class="pf-container">
                <div>
                    {params.category === "all" ? <></> : <h2>{categoria}</h2>}
                </div>
                <CheckboxGroup
                    label="Brand"
                    color="primary"
                    value={brand}
                    onValueChange={setBrand}
                >
                    <Checkbox value="Adidas">Adidas</Checkbox>
                    <Checkbox value="Nike">Nike</Checkbox>
                    <Checkbox value="Fila">Fila</Checkbox>
                </CheckboxGroup>
            </div>
        </div>
    );
};

export default ProductsFilter;
