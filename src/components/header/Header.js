import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import "./Header.css";
import { ThemeContext } from "../../services/theme/theme.context";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { categories } from "../../assets/productConfig/Categories";
import { RoleContext } from "../../services/authentication/role.context";
import AuthService from "../../services/authentication/auth.service";
import { useState } from "react";
import { useEffect } from "react";
import AlertComponent from "../alertComponent/AlertComponent";
import { Button } from "@nextui-org/react";

const Header = () => {
    const { theme } = useContext(ThemeContext);
    const { role, setRole } = useContext(RoleContext);
    const authService = new AuthService();
    const navigate = useNavigate();

    const [renderKey, setRenderKey] = useState(0); // Add state to force re-render

    useEffect(() => {
        setRenderKey(renderKey + 1);
    }, [role]);

    const logOut = () => {
        setShowAlert(false);
        authService.resetSession();
        setRole(-1);
        setRenderKey(renderKey + 1);
        navigate("/home");
    };
    const logOutCheck = () => {
        showAlertWithMessageAction("Seguro que desea salir?", "Salir");
    };

    //////////////////////////////////////////////////////////////////////////////
    const [alertMessage, setAlertMessage] = useState("");
    const [alertButtonMessage, setAlertButtonMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const showAlertWithMessageAction = (message, buttonMessage) => {
        setAlertMessage(message);
        setAlertButtonMessage(buttonMessage);
        setShowAlert(true);
    };

    const closeAlert = () => {
        setShowAlert(false);
    };

    //////////////////////////////////////////////////////////////////////////

    //console.log("header");
    return (
        <div>
            <div>
                {showAlert && (
                    <AlertComponent
                        message={alertMessage}
                        buttonMessage={alertButtonMessage}
                        onClose={closeAlert}
                    >
                        <Button
                            radius="full"
                            className="col-span-2 col-5 bg-gradient-to-tr from-blue-500 to-light-blue-500 text-white shadow-lg button"
                            onClick={logOut}
                        >
                            Salir
                        </Button>
                    </AlertComponent>
                )}
            </div>
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
                key={renderKey}
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
                            //style={{ maxHeight: "100px" }}
                            //navbarScroll
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
                                <img
                                    class={
                                        theme === "dark"
                                            ? "logo-dark logo-hover"
                                            : "logo-hover"
                                    }
                                    width="27"
                                    src="https://img.icons8.com/fluency-systems-regular/48/online-store.png"
                                    alt="online-store"
                                />
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

                            {role === 1 || role === 2 ? (
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
                                    <img
                                        width="27"
                                        class={
                                            theme === "dark"
                                                ? "logo-dark logo-hover"
                                                : "logo-hover"
                                        }
                                        src="https://img.icons8.com/fluency-systems-regular/48/edit-product.png"
                                        alt="edit-product"
                                    />
                                </Nav.Link>
                            ) : (
                                <></>
                            )}

                            {role === 2 ? (
                                <Nav.Link
                                    as={Link}
                                    to="/superadmin"
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
                                    <img
                                        width="27"
                                        class={
                                            theme === "dark"
                                                ? "logo-dark logo-hover"
                                                : "logo-hover"
                                        }
                                        src="https://img.icons8.com/fluency-systems-regular/48/edit-user.png"
                                        alt="edit-user"
                                    />
                                </Nav.Link>
                            ) : (
                                <></>
                            )}
                        </Nav>

                        <Nav className="my-2 my-lg-2 me-3">
                            {authService.isLoggedIn() === true ? (
                                <>
                                    <Nav.Link
                                        as={Link}
                                        to="/cart"
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
                                        <img
                                            class={
                                                theme === "dark"
                                                    ? "logo-dark logo-hover"
                                                    : "logo-hover"
                                            }
                                            width="27"
                                            src="https://img.icons8.com/fluency-systems-regular/48/shopping-cart--v1.png"
                                            alt="shopping-cart--v1"
                                        />
                                    </Nav.Link>
                                    <Nav.Link
                                        as={Link}
                                        to="/sales"
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
                                        <img
                                            class={
                                                theme === "dark"
                                                    ? "logo-dark logo-hover"
                                                    : "logo-hover"
                                            }
                                            width="27"
                                            src="https://img.icons8.com/fluency-systems-regular/48/shopping-mall.png"
                                            alt="shopping-mall"
                                        />
                                    </Nav.Link>
                                    <Nav.Link
                                        as={Link}
                                        to="/user"
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
                                        <img
                                            class={
                                                theme === "dark"
                                                    ? "logo-dark logo-hover"
                                                    : "logo-hover"
                                            }
                                            width="27"
                                            src="https://img.icons8.com/fluency-systems-regular/48/edit-user.png"
                                            alt="edit-user"
                                        />
                                    </Nav.Link>
                                    <Nav.Link
                                        onClick={logOutCheck}
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
                                        <img
                                            class={
                                                theme === "dark"
                                                    ? "logo-dark logo-hover"
                                                    : "logo-hover"
                                            }
                                            width="27"
                                            src="https://img.icons8.com/fluency-systems-regular/48/exit--v1.png"
                                            alt="exit--v1"
                                        />
                                    </Nav.Link>
                                </>
                            ) : (
                                <>
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
                                        <img
                                            width="31"
                                            class={
                                                theme === "dark"
                                                    ? "logo-dark logo-hover"
                                                    : "logo-hover"
                                            }
                                            src="https://img.icons8.com/fluency-systems-regular/48/enter-2.png"
                                            alt="enter-2"
                                        />
                                    </Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {/* <div className="themeSwitch">
                <ThemeSwitch />
            </div> */}
        </div>
    );
};

export default Header;
