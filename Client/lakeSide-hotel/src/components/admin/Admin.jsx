import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Admin = () => {
  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Welcome to Admin Panel</h2>
      <hr />
      <Row className="text-center">
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Manage Rooms</Card.Title>
              <Card.Text>
                Add, edit, or delete rooms in the hotel.
              </Card.Text>
              <Button as={Link} to="/add-room" variant="primary">
                Go to Room Management
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Manage Bookings</Card.Title>
              <Card.Text>
                View and manage customer bookings.
              </Card.Text>
              <Button as={Link} to="/manage-bookings" variant="primary">
                Go to Booking Management
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>View Reports</Card.Title>
              <Card.Text>
                Generate and view reports on hotel operations.
              </Card.Text>
              <Button as={Link} to="/reports" variant="primary">
                Go to Reports
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
