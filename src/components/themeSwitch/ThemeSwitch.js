import React, { useContext } from "react";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "../../assets/icons/Moonicon";
import { SunIcon } from "../../assets/icons/Sunicon";
import { ThemeContext } from "../../services/theme/theme.context";

const themeValue = JSON.parse(localStorage.getItem("kongoTheme"));

function ThemeSwitch() {
    const { setTheme1 } = useContext(ThemeContext);
    const [isSelected, setIsSelected] = React.useState(
        themeValue !== null
            ? themeValue.theme === "light"
                ? false
                : true
            : false
    );

    if (isSelected === false) {
        setTheme1("light");
    } else {
        setTheme1("dark");
    }

    return (
        <Switch
            isSelected={isSelected}
            onValueChange={setIsSelected}
            size="lg"
            color="default"
            thumbIcon={({ isSelected, className }) =>
                isSelected ? (
                    <MoonIcon className={className} />
                ) : (
                    <SunIcon className={className} />
                )
            }
        ></Switch>
    );
}

export default ThemeSwitch;
