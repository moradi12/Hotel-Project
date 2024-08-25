import React, { useEffect, useState } from 'react';
import { Button, Container, Modal, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { logoutAction } from '../components/common/Redux/AuthReducer';
import { hotelSystem } from '../components/common/Redux/store';

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  const [theme, setTheme] = useState('light');
  const [unreadCount, setUnreadCount] = useState(5); // Example count
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by verifying the presence of JWT in sessionStorage
    const token = sessionStorage.getItem('jwt');
    if (token) {
      setIsLoggedIn(true);
      // Retrieve the user name and user type from sessionStorage
      const name = sessionStorage.getItem('userName');
      const type = sessionStorage.getItem('userType');
      setUserName(name || "User");
      setUserType(type || "");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme; // Apply the theme to the body
  };

  const handleLogoutConfirm = () => {
    setShowLogoutConfirm(true);
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirm(false);
  };

  const handleLogout = () => {
    // Perform logout actions
    hotelSystem.dispatch(logoutAction());
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userType');
    setIsLoggedIn(false);
    setShowLogoutConfirm(false);
    navigate('/login');
    console.log("User logged out successfully");
  };

  return (
    <>
      <Navbar bg="white" expand="lg" className="shadow-sm py-3">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
            Sunset Queen Hotel
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0 navbar-nav-scroll">
              <Nav.Link 
                as={Link} 
                to="/browse-all-rooms" 
                style={{ marginRight: '20px', color: '#7c66e3' }}
              >
                Browse <span className="fw-bold">Rooms</span>
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="/browse-rooms" 
                style={{ marginRight: '20px', color: '#7c66e3' }}
              >
                Manage <span className="fw-bold">Rooms</span>
              </Nav.Link>
              {userType === "ADMIN" && (
                <Nav.Link as={Link} to="/admin/dashboard" style={{ marginRight: '20px', color: '#ff8c00' }}>
                  <span className="fw-bold">Dashboard</span>
                </Nav.Link>
              )}
              {userType === "CUSTOMER" && (
                <Nav.Link as={Link} to="/my-reservations" style={{ marginRight: '20px', color: '#7c66e3' }}>
                  My <span className="fw-bold">Reservations</span>
                </Nav.Link>
              )}
              <Nav.Link as={Link} to="/admin" style={{ marginRight: '20px', color: '#ff8c00' }}>
                <span className="fw-bold">Admin</span>
              </Nav.Link>
            </Nav>
            <Nav className="d-flex align-items-center ms-auto">
              <Nav.Link as={Link} to="/notifications" style={{ marginRight: '20px', position: 'relative', color: '#ff4757' }}>
                <FaBell />
                {unreadCount > 0 && <span className="badge bg-danger">{unreadCount}</span>}
              </Nav.Link>
              <Nav.Link onClick={toggleTheme} style={{ cursor: 'pointer', marginRight: '20px', color: '#2ed573' }}>
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </Nav.Link>
              {isLoggedIn ? (
                <>
                  <NavDropdown title={`Hello, ${userType === "ADMIN" ? "Admin" : userName}`} id="navbarDropdown">
                    <NavDropdown.Item as={Link} to="/profile">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogoutConfirm}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Nav.Link as={Link} to="/login" style={{ marginRight: '20px', color: '#7c66e3' }}>
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutConfirm} onHide={handleLogoutCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleLogoutCancel}>Cancel</Button>
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavBar;
