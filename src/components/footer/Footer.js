import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../../services/theme/theme.context";
import "./Footer.css";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div class={theme === "dark" ? "dark-theme" : "light-theme"}>
      <div class="divider"></div>
      <footer class="pt-3">
        <div class="container-fluid text-center text-md-left">
          <div class="row">
            <div class="col-md-6 pt-2 pb-4">
              <h6 class="text-uppercase">Contactános</h6>
              <a class="text-cyan-500" href="mailto:juansaglione123@gmail.com">
                Mandános un mail
              </a>
              <li class="list-unstyled">
                <a
                  class={
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
            <hr class="clearfix w-100 d-md-none" />
            <div class="col-md-5 pt-2">
              <h6 class="text-uppercase">Encontrános en Instagram</h6>
              <ul class="list-unstyled">
                <li class="py-1">
                  <a
                    class="social"
                    target="_blank"
                    href="https://www.instagram.com/nicointelangelo/"
                    rel="noreferrer"
                  >
                    Nico
                  </a>
                </li>
                <li class="py-1">
                  <a
                    class="social"
                    rel="noreferrer"
                    href="https://www.instagram.com/juansaglione/"
                    target="_blank"
                  >
                    Juan
                  </a>
                </li>
                <li class="py-1">
                  <a
                    class="social"
                    rel="noreferrer"
                    href="https://www.instagram.com/mateo_monti/"
                    target="_blank"
                  >
                    Mateo
                  </a>
                </li>
                <li class="py-1">
                  <a
                    class="social"
                    rel="noreferrer"
                    href="https://www.instagram.com/santiagocrucianelli/"
                    target="_blank"
                  >
                    Santi
                  </a>
                </li>
              </ul>
            </div>

            {/* <hr class="clearfix w-100 d-md-none pb-0" />

            <div class="col-md-3 mb-md-0 mb-3">
              <strong class="text-uppercase">Links</strong>
              <ul class="list-unstyled pt-3">
                <li>
                  <a href="#!">Link 1</a>
                </li>
                <li class="py-1">
                  <a href="#!">Link 2</a>
                </li>
                <li>
                  <a href="#!">Link 3</a>
                </li>
                <li class="py-1">
                  <a href="#!">Link 4</a>
                </li>
              </ul>
            </div>

            <div class="col-md-3 mb-md-0 mb-3">
              <strong class="text-uppercase">Instagram</strong>
            </div> */}
          </div>
          <div class="footer-copyright text-center py-3">
            © 2023 Copyright:
            <a class="social" href="https://campusvirtual.austral.edu.ar/">
              ‎ CampusAustral.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
