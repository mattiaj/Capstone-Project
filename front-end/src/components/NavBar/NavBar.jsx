import React, { useContext } from 'react';
import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { themeContext } from '../../Context/ThemeContextProvider';
import { BsCart4 } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineNoAccounts } from "react-icons/md";
import { FaSun } from "react-icons/fa";
import { BsMoonStarsFill } from "react-icons/bs";


export default function NavBar() {

  const navigate = useNavigate();

  const ifUser = JSON.parse(localStorage.getItem("user"));

  const handleDisconnect = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/")
  }

  const {theme, setTheme} = useContext(themeContext);

  return (
    <>
        <Navbar bg={theme === "light" ? "dark" : "light"} data-bs-theme={theme === "dark" ? "light" : "dark"} sticky='top' >
            <Container>
                <Navbar.Brand onClick={() => navigate("/")} >BOOKS2LIVES</Navbar.Brand>
                <Navbar.Toggle aria-controls='navbarScroll' />
                <Navbar.Collapse id='navbarScroll'>
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }}>
                    <Nav.Link onClick={() => navigate("/")} className='text-secondary'>Home</Nav.Link>
                    </Nav>
                    <Nav>
                      <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className={theme === "dark" ? "d-none" : "bg-dark border-0 ms-auto text-light"}><BsMoonStarsFill /></Button>
                      <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                      className={theme === "light" ? "d-none" : "bg-light border-0 ms-auto text-dark"}><FaSun /></Button>
                    </Nav>
                    <Nav className="my-2 my-lg-0" style={{ maxHeight: '100px' }}>
                      {ifUser !== null ?
                      <NavDropdown title="Profilo"  id="navbarScrollingDropdown" align={{xs: "start"}}>
                         <NavDropdown.Item onClick={() => navigate("/profile")} ><FaUserCircle /> Account</NavDropdown.Item>
                         <NavDropdown.Item onClick={() => navigate("/cart")}><BsCart4 /> Carrello</NavDropdown.Item>
                         <NavDropdown.Divider />
                         <NavDropdown.Item onClick={() => handleDisconnect()} ><MdOutlineNoAccounts /> Disconnettiti</NavDropdown.Item>
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
