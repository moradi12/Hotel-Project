import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

const Profile = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  useEffect(() => {
    // Fetch user data from sessionStorage or API
    const name = sessionStorage.getItem('userName') || 'User';
    const userEmail = sessionStorage.getItem('userEmail') || 'user@example.com';
    const userRole = sessionStorage.getItem('userType') || 'Customer';

    setUserName(name);
    setEmail(userEmail);
    setRole(userRole);
  }, []);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Handle profile update logic here (API call)
    console.log('Profile updated:', { userName, email });
    setUpdateMessage('Profile updated successfully!');
    setTimeout(() => setUpdateMessage(''), 3000); // Clear the message after 3 seconds
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setPasswordMessage('Passwords do not match!');
      return;
    }
    // Handle password change logic here (API call)
    console.log('Password changed:', { newPassword });
    setPasswordMessage('Password changed successfully!');
    setTimeout(() => setPasswordMessage(''), 3000); // Clear the message after 3 seconds
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="p-4 mt-5">
            <Card.Title className="text-center">Profile</Card.Title>
            <Form onSubmit={handleProfileUpdate}>
              <Form.Group className="mb-3">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  type="text"
                  value={role}
                  readOnly
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Update Profile
              </Button>
              {updateMessage && <p className="text-success text-center mt-3">{updateMessage}</p>}
            </Form>

            <hr />

            <Form onSubmit={handlePasswordChange}>
              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="secondary" type="submit" className="w-100">
                Change Password
              </Button>
              {passwordMessage && <p className="text-danger text-center mt-3">{passwordMessage}</p>}
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
