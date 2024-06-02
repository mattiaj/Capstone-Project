import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export default function NavBar() {

  const navigate = useNavigate();

  const ifUser = JSON.parse(localStorage.getItem("user"));

  const handleDisconnect = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/")
  }

  return (
    <>
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand onClick={() => navigate("/")}>Books</Navbar.Brand>
                <Navbar.Toggle aria-controls='navbarScroll' />
                <Navbar.Collapse id='navbarScroll'>
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} myNav>
                    <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
                    </Nav>
                    <Nav className="my-2 my-lg-0" style={{ maxHeight: '100px' }}>
                      {ifUser !== null ?
                      <NavDropdown title="Profilo" id="navbarScrollingDropdown" align={{xs: "start"}}>
                         <NavDropdown.Item onClick={() => navigate("/profile")} >Account</NavDropdown.Item>
                         <NavDropdown.Item onClick={() => navigate("/cart")}>Carrello</NavDropdown.Item>
                         <NavDropdown.Divider />
                         <NavDropdown.Item onClick={() => handleDisconnect()} >Disconnettiti</NavDropdown.Item>
                      </NavDropdown> 
                      :
                      <NavDropdown title="Accedi" id="navbarScrollingDropdown" align={{xs: "start"}}>
                          <NavDropdown.Item onClick={() => navigate("/login")} >Accedi</NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item onClick={() => navigate("/registration")}>Registrati</NavDropdown.Item>
                      </NavDropdown> 
                      }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
  )
}
