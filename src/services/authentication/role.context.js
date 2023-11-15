import React from "react";
import { useState } from "react";
import { createContext } from "react";

export const RoleContext = createContext();

export const RoleContextProvider = ({ children }) => {
    const [role, setRole] = useState(0);

    //0 = User
    //1 = Admin
    //2 = SuperAdmin

    return (
        <RoleContext.Provider value={{ role, setRole }}>
            {children}
        </RoleContext.Provider>
    );
};
