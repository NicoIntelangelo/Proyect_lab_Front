import React from "react";
import { Input } from "@nextui-org/react";

const Register = () => {
    return (
        <div>
            <Input
                key="outside"
                type="email"
                label="Email"
                labelPlacement="outside"
                description="outside"
            />
            <Input
                key="outside"
                type="email"
                label="Email"
                labelPlacement="outside"
                description="outside"
            />
        </div>
    );
};

export default Register;
