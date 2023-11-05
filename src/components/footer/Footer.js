import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../../services/theme/theme.context";
import "./Footer.css";
import { Divider } from "@nextui-org/react";

const Footer = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <div>
            <div
                className={
                    theme === "dark" ? "fot-dark-theme" : "fot-light-theme"
                }
            >
                <Divider
                    className={
                        theme === "dark" ? "dark dark-fot-divider" : "light"
                    }
                />
                <footer className="pt-3">
                    <div class="container-fluid text-center text-md-left">
                        <div className="row">
                            <div className="col-md-6 pt-2 pb-4">
                                <h6 className="text-uppercase">Contactános</h6>
                                <a
                                    className="text-cyan-500"
                                    href="mailto:juansaglione123@gmail.com"
                                >
                                    Mandános un mail
                                </a>
                                <li className="list-unstyled">
                                    <a
                                        className={
                                            theme === "dark"
                                                ? "text-gray-400 no-underline hover:underline"
                                                : "text-gray-600 no-underline hover:underline"
                                        }
                                        href="https://maps.app.goo.gl/hvPamjLHT7PCx4U57"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Rosario, Santa Fe, AR.
                                    </a>
                                </li>
                            </div>
                            <hr className="clearfix w-100 d-md-none" />
                            <div className="col-md-5 pt-2">
                                <h6 className="text-uppercase">
                                    Encontrános en Instagram
                                </h6>
                                <ul className="list-unstyled">
                                    <li className="py-1">
                                        <a
                                            className="fot-social"
                                            target="_blank"
                                            href="https://www.instagram.com/nicointelangelo/"
                                            rel="noreferrer"
                                        >
                                            Nico
                                        </a>
                                    </li>
                                    <li className="py-1">
                                        <a
                                            className="fot-social"
                                            rel="noreferrer"
                                            href="https://www.instagram.com/juansaglione/"
                                            target="_blank"
                                        >
                                            Juan
                                        </a>
                                    </li>
                                    <li className="py-1">
                                        <a
                                            className="fot-social"
                                            rel="noreferrer"
                                            href="https://www.instagram.com/mateo_monti/"
                                            target="_blank"
                                        >
                                            Mateo
                                        </a>
                                    </li>
                                    <li className="py-1">
                                        <a
                                            className="fot-social"
                                            rel="noreferrer"
                                            href="https://www.instagram.com/santiagocrucianelli/"
                                            target="_blank"
                                        >
                                            Santi
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer-copyright text-center py-3">
                            © 2023 Copyright:
                            <a
                                className="fot-social"
                                href="https://campusvirtual.austral.edu.ar/"
                            >
                                ‎ CampusAustral.com
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Footer;
