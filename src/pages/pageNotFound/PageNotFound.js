import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const PageNotFound = () => {
    const navigate = useNavigate();

    const goBackHandler = () => {
        navigate("/home");
    };
    return (
        <div className="container404">
            <h2 className="my-4">
                !Oops! La página solicitada no fue contratada
            </h2>
            <Button onClick={goBackHandler} variant="primary">
                Volver al inicio
            </Button>
        </div>
    );
};

export default PageNotFound;
