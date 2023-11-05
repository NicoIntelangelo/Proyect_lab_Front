import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../../services/theme/theme.context";
import "./Footer.css";
import { Divider } from "@nextui-org/react";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={theme === "dark" ? "dark fot-dark-theme" : "light"}>
      <Divider className="my-0 fot-divider" />
      <footer className="pt-3">
        <div className="container-fluid text-center text-md-left">
          <div className="row ">
            <div className="col-md-6 pb-3">
              <h6 className="text-uppercase py-3">Contactános</h6>
              <a className="fot-social" href="mailto:juansaglione123@gmail.com">
                Mandános un mail
              </a>
              <li className="list-unstyled pt-2">
                <a
                  className="text-neutral-500 no-underline"
                  href="https://maps.app.goo.gl/hvPamjLHT7PCx4U57"
                  target="_blank"
                  rel="noreferrer"
                >
                  Rosario, Santa Fe, AR.
                </a>
              </li>
            </div>
            <Divider className="d-md-none fot-divider my-3" />
            <div className="col-md-5">
              <h6 className="text-uppercase py-3">Encontrános en Instagram</h6>
              <ul className="list-unstyled">
                <li className="pb-1">
                  <a
                    className="fot-social"
                    target="_blank"
                    href="https://www.instagram.com/nicointelangelo/"
                    rel="noreferrer"
                  >
                    @nicointelangelo
                  </a>
                </li>
                <li className="py-1">
                  <a
                    className="fot-social"
                    rel="noreferrer"
                    href="https://www.instagram.com/juansaglione/"
                    target="_blank"
                  >
                    @juansaglione
                  </a>
                </li>
                <li className="py-1">
                  <a
                    className="fot-social"
                    rel="noreferrer"
                    href="https://www.instagram.com/mateo_monti/"
                    target="_blank"
                  >
                    @mateo_monti
                  </a>
                </li>
                <li className="py-1">
                  <a
                    className="fot-social"
                    rel="noreferrer"
                    href="https://www.instagram.com/santiagocrucianelli/"
                    target="_blank"
                  >
                    @santiagocrucianelli
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-copyright text-center py-3">
            © 2023 Copyright:
            <a
              className="text-cyan-500 no-underline"
              href="https://campusvirtual.austral.edu.ar/"
            >
              ‎ CampusAustral.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
