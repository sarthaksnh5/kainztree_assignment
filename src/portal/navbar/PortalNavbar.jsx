import React from "react";
import { Button, Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
const PortalNavbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/auth/login");
  };
  return (
    <React.Fragment>
      <Navbar bg="dark" expand="lg" className="navbar-dark">
        <Container>
          <Navbar.Brand>Sarthak - Kainztree Full Stack</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/items">Items</Nav.Link>
              <Nav.Link href="/">Stocks</Nav.Link>
              <Nav.Link href="/">Build</Nav.Link>
              <Nav.Link href="/">Customers</Nav.Link>
              
            </Nav>
            <Nav.Link>
              <Button className="btn-warning" onClick={logout}>
                Logout
              </Button>
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};
export default PortalNavbar;
