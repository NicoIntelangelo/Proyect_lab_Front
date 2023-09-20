import React from "react";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "../../assets/icons/Moonicon";
import { SunIcon } from "../../assets/icons/Sunicon";

function ThemeSwitch() {
    return (
        <Switch
            defaultSelected
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
