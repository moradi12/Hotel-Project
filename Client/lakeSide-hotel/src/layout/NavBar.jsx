import React, { useCallback, useEffect, useState } from 'react';
import { Button, Container, Modal, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { logoutAction } from '../components/common/Redux/AuthReducer';
import { hotelSystem } from '../components/common/Redux/store';

const useUserState = (loggedIn) => {
  const [userState, setUserState] = useState({
    isLoggedIn: false,
    userName: '',
    userType: '',
  });

  useEffect(() => {
    const token = sessionStorage.getItem('jwt');
    if (token) {
      setUserState({
        isLoggedIn: true,
        userName: sessionStorage.getItem('userName') || 'User',
        userType: sessionStorage.getItem('userType') || '',
      });
    } else {
      setUserState({
        isLoggedIn: false,
        userName: '',
        userType: '',
      });
    }
  }, [loggedIn]);

  return userState;
};

const NavBar = ({ loggedIn }) => {
  const [unreadCount] = useState(5); // Example count
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, userName, userType } = useUserState(loggedIn);

  const confirmLogout = useCallback(() => setShowLogoutConfirm(true), []);
  const cancelLogout = useCallback(() => setShowLogoutConfirm(false), []);

  const handleLogout = useCallback(() => {
    hotelSystem.dispatch(logoutAction());
    sessionStorage.clear();
    setShowLogoutConfirm(false);
    navigate('/login');
    console.log("User logged out successfully");
  }, [navigate]);

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
              <Nav.Link as={Link} to="/browse-all-rooms" className="text-primary mx-3">
                Browse <span className="fw-bold">Rooms</span>
              </Nav.Link>
              <Nav.Link as={Link} to="/browse-rooms" className="text-primary mx-3">
                Manage <span className="fw-bold">Rooms</span>
              </Nav.Link>
              {userType === 'ADMIN' && (
                <Nav.Link as={Link} to="/admin/dashboard" className="text-warning mx-3">
                  <span className="fw-bold">Dashboard</span>
                </Nav.Link>
              )}
              {userType === 'CUSTOMER' && (
                <Nav.Link as={Link} to="/my-reservations" className="text-primary mx-3">
                  My <span className="fw-bold">Reservations</span>
                </Nav.Link>
              )}
              <Nav.Link as={Link} to="/admin" className="text-warning mx-3">
                <span className="fw-bold">Admin</span>
              </Nav.Link>
            </Nav>
            <Nav className="d-flex align-items-center ms-auto">
              <Nav.Link as={Link} to="/notifications" className="position-relative text-danger mx-3">
                <FaBell />
                {unreadCount > 0 && <span className="badge bg-danger">{unreadCount}</span>}
              </Nav.Link>
              {isLoggedIn ? (
                <NavDropdown title={`Hello, ${userType === 'ADMIN' ? 'Admin' : userName}`} id="navbarDropdown">
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/settings">
                    Settings
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={confirmLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login" className="text-primary mx-3">
                    Login
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register" className="text-primary mx-3">
                    Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Logout Confirmation Modal */}
      <Modal show={showLogoutConfirm} onHide={cancelLogout}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelLogout}>Cancel</Button>
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavBar;
