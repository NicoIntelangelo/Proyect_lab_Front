import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import ThemeSwitch from "../themeSwitch/ThemeSwitch";

import "./Header.css";
import { ThemeContext } from "../../services/theme/theme.context";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { categories } from "../../assets/productConfig/Categories";

const Header = () => {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <p
                style={
                    theme === "dark"
                        ? {
                              color: "#ffffff",
                              backgroundColor: "#000000",
                              border: "8px solid #000000",
                          }
                        : {
                              backgroundColor: "#ffffff",
                              border: "8px solid #ffffff",
                          }
                }
            >
                6 Cuotas sin interes de Lunes a Miércoles con todos los Bancos
            </p>

            <Navbar
                style={
                    theme === "dark"
                        ? {
                              backgroundColor: "#000000",
                          }
                        : {
                              backgroundColor: "#ffffff",
                          }
                }
                expand="sm"
                sticky="top"
            >
                <Container fluid>
                    <Navbar.Brand as={Link} to="/home">
                        <img
                            id={theme === "dark" ? "logo-dark" : ""}
                            alt=""
                            src="https://acdn.mitiendanube.com/stores/219/431/themes/common/logo-1635651913-1677604746-9d2e7d826bcdb1506200625fca2f2b351677604747-320-0.webp"
                            width="100"
                            height="70"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>

                    <Navbar.Toggle
                        aria-controls="navbarScroll"
                        style={
                            theme === "dark"
                                ? {
                                      backgroundColor: "#4b4b4b",
                                  }
                                : {}
                        }
                    />

                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-2"
                            style={{ maxHeight: "100px" }}
                            navbarScroll
                        >
                            <Nav.Link
                                as={Link}
                                to="/shop/all"
                                style={
                                    theme === "dark"
                                        ? {
                                              color: "#ffffff",
                                          }
                                        : {
                                              color: "#000000",
                                          }
                                }
                            >
                                Shop
                            </Nav.Link>

                            <NavDropdown
                                id={
                                    theme === "dark"
                                        ? "nav-dropdown-dark"
                                        : "nav-dropdown"
                                }
                                title="Categorias"
                            >
                                {categories.map((cat, index) => (
                                    <NavDropdown.Item
                                        key={index}
                                        as={Link}
                                        to={`/shop/${cat.value}`}
                                        style={
                                            theme === "dark"
                                                ? {
                                                      backgroundColor:
                                                          "#000000",
                                                      color: "#ffffff",
                                                  }
                                                : {
                                                      backgroundColor:
                                                          "#ffffff",
                                                      color: "#000000",
                                                  }
                                        }
                                    >
                                        {cat.label}
                                    </NavDropdown.Item>
                                ))}

                                <NavDropdown.Divider
                                    style={
                                        theme === "dark"
                                            ? {
                                                  backgroundColor: "#ffffff",
                                                  margin: 0,
                                              }
                                            : {
                                                  backgroundColor: "#ffffff",
                                                  margin: 0,
                                              }
                                    }
                                />

                                <NavDropdown.Item
                                    as={Link}
                                    to="/shop/new"
                                    style={
                                        theme === "dark"
                                            ? {
                                                  backgroundColor: "#000000",
                                                  color: "#ffffff",
                                              }
                                            : {
                                                  backgroundColor: "#ffffff",
                                                  color: "#000000",
                                              }
                                    }
                                >
                                    New In
                                </NavDropdown.Item>
                            </NavDropdown>

                            <Nav.Link
                                as={Link}
                                to="/admin"
                                style={
                                    theme === "dark"
                                        ? {
                                              color: "#ffffff",
                                          }
                                        : {
                                              color: "#000000",
                                          }
                                }
                            >
                                Admin
                            </Nav.Link>
                        </Nav>

                        <Nav className="my-2 my-lg-2 me-3">
                            <Nav.Link
                                as={Link}
                                to="/ingresar"
                                style={
                                    theme === "dark"
                                        ? {
                                              color: "#ffffff",
                                          }
                                        : {
                                              color: "#000000",
                                          }
                                }
                            >
                                Ingresar
                            </Nav.Link>
                            <Nav.Link
                                as={Link}
                                to="/ingresar"
                                style={
                                    theme === "dark"
                                        ? {
                                              color: "#ffffff",
                                          }
                                        : {
                                              color: "#000000",
                                          }
                                }
                            >
                                Carrito
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <div className="themeSwitch">
                        <ThemeSwitch />
                    </div>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;

// hasta 640 hacer que se cambie por un desplegable
