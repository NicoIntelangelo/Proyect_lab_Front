import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import ThemeSwitch from "../themeSwitch/ThemeSwitch";

import "./Header.css";

const Header = () => {
    return (
        <>
            <p className="text-center mt-2 mb-2">Or right-aligned</p>

            <Navbar
                style={{
                    backgroundSize: "0",
                    backgroundColor: "#FFFFFF",
                    color: "#66a0cf",
                }}
                expand="sm"
                sticky="top"
            >
                <Container fluid>
                    <Navbar.Brand href="/home">
                        <img
                            alt=""
                            src="https://acdn.mitiendanube.com/stores/219/431/themes/common/logo-1635651913-1677604746-9d2e7d826bcdb1506200625fca2f2b351677604747-320-0.webp"
                            width="100"
                            height="70"
                            className="d-inline-block align-top"
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-2"
                            style={{ maxHeight: "100px" }}
                            navbarScroll
                        >
                            <Nav.Link href="/shop/all">Shop</Nav.Link>
                            <NavDropdown title="Categorias">
                                <NavDropdown.Item href="/shop">
                                    Shop
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action4">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">
                                    Something else here
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav className="my-2 my-lg-2 me-3">
                            <Nav.Link href="/ingresar">Ingresar</Nav.Link>
                            <Nav.Link href="/ingresar">Carrito</Nav.Link>
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
