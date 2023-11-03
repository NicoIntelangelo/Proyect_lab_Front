import "./ProductsFilter.css";

import { CheckboxGroup, Checkbox, Divider, Input } from "@nextui-org/react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../services/theme/theme.context";
import { Button } from "react-bootstrap";

const ProductsFilter = ({
  brand,
  setBrand,
  maxPrice,
  minPrice,
  onMaxPriceChange,
  onMinPriceChange,
  onFilter,
  onReset,
}) => {
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
    <div className={theme === "dark" ? "dark" : "light"}>
      <div className="px-3">
        <div>{params.category === "all" ? <></> : <h2>{categoria}</h2>}</div>
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
        <Divider className="opacity-50" />
        <h6 className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
          Filtro por precio:
        </h6>
        <div className="">
          <Input
            className="py-1"
            label="Desde"
            type="number"
            placeholder="0"
            size="sm"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
            value={minPrice}
            onChange={onMinPriceChange}
          />
          <Input
            className="py-3"
            label="Hasta"
            type="number"
            placeholder="0"
            size="sm"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
            value={maxPrice}
            onChange={onMaxPriceChange}
          />
          <div className="flex justify-center gap-4">
            <Button onClick={onFilter}>Filtrar</Button>
            <Button onClick={onReset} variant="secondary">
              Reset
            </Button>
          </div>
        </div>
      </div>
      <Divider className="opacity-100" />
    </div>
  );
};

export default ProductsFilter;
