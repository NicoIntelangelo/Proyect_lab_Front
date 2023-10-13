import { useState } from "react";
import { createContext } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme1] = useState("light");

    localStorage.setItem("kongoTheme", JSON.stringify({ theme }));

    return (
        <ThemeContext.Provider value={{ theme, setTheme1 }}>
            {children}
        </ThemeContext.Provider>
    );
};
