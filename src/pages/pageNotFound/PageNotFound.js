import React from "react";
import "./PageNotFound.css";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { ThemeContext } from "../../services/theme/theme.context";

const PageNotFound = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const goBackHandler = () => {
    navigate("/home");
  };
  return (
    <div class={theme === "dark" ? "container404-dark" : "container404-light"}>
      <div class="centered-column">
        <h2 className="my-4">!Oops! La página solicitada no fue encontrada</h2>
        <Button
          onClick={goBackHandler}
          radius="full"
          className="col-span-2 row-5 bg-gradient-to-tr from-blue-500 to-light-blue-500 text-white shadow-lg"
        >
          Volver
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
