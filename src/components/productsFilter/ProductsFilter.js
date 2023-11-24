import { useParams } from "react-router-dom";
import { useContext } from "react";

import "./ProductsFilter.css";
import { CheckboxGroup, Checkbox, Divider, Slider } from "@nextui-org/react";
import { Button } from "react-bootstrap";

import { ThemeContext } from "../../services/theme/theme.context";
import { brands } from "../../assets/productConfig/Brands";
import { useState } from "react";

const ProductsFilter = ({
  brand,
  setBrand,
  onMaxPriceChange,
  onMinPriceChange,
  minPrice,
  maxPrice,
  onFilter,
  onReset,
}) => {
  const params = useParams();
  const { theme } = useContext(ThemeContext);
  const categoria = capitalize(params.category);
  const [minPriceLocal, setMinPriceLocal] = useState(minPrice);
  const [maxPriceLocal, setMaxPriceLocal] = useState(maxPrice);
  //estados en este componente para cambiar el valor del precio en los onChange() y solo pasar el value al padre cuando soltamos el slider

  const handleLocalReset = () => {
    onReset(); //acá llamamos al reset del shop, que es donde se hace el filtro
    setMinPriceLocal(0);
    setMaxPriceLocal(1000000);
  };

  function capitalize(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <div className={theme === "dark" ? "dark" : "light"}>
      <div className="px-3 ">
        <div>{params.category === "all" ? <></> : <h2>{categoria}</h2>}</div>

        <CheckboxGroup
          label="Marca"
          color="primary"
          value={brand}
          onValueChange={setBrand}
        >
          {brands.map((cat) => (
            <Checkbox key={cat.value} value={cat.value}>
              {cat.label}
            </Checkbox>
          ))}
        </CheckboxGroup>

        <Divider className="opacity-50" />

        <h6 className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
          Filtro por precio:
        </h6>

        <div>
          <Slider
            className="py-3"
            label="Desde"
            color="foreground"
            step={1000}
            value={minPriceLocal}
            minValue={0}
            maxValue={100000}
            onChange={setMinPriceLocal} //actualizamos el valor en cada cambio que hace antes de soltar, solo dentro del componente
            onChangeEnd={onMinPriceChange} //recien al soltar se le pasa el valor al padre para no reevaluar innecesariamente toda la página shop
          />
          <Slider
            className="py-3"
            label="Hasta"
            color="foreground"
            step={1000}
            value={maxPriceLocal}
            minValue={0}
            maxValue={100000}
            onChange={setMaxPriceLocal}
            onChangeEnd={onMaxPriceChange}
          />
          <div className="flex justify-center gap-4">
            <Button onClick={onFilter}>Filtrar</Button>
            <Button onClick={handleLocalReset} variant="secondary">
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
