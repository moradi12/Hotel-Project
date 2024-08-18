import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
    // const [showAccount, setShowAccount] = useState(false);

    // const handleAccountClick = () => {
    //     setShowAccount(!showAccount);
    // }

  return (
    <Navbar bg="white" expand="lg" className="shadow-sm py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
          LakeSide Hotel
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 navbar-nav-scroll">
            <Nav.Link as={Link} to="/browse-all-rooms">Browse Rooms</Nav.Link>
            <Nav.Link as={Link} to="/manage-rooms">Manage Rooms</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/find-booking">Find My Booking</Nav.Link>
            <NavDropdown title="Account" id="navbarDropdown">
              <NavDropdown.Item as={Link} to="/user">User</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/admin">Admin</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
