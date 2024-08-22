import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

const RoomSearchForm = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [roomType, setRoomType] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement the search functionality here
    console.log('Search clicked', { checkInDate, checkOutDate, roomType });
  };

  return (
    <Form onSubmit={handleSearch}>
      <Row className="align-items-center">
        <Col md={4}>
          <Form.Group controlId="checkInDate">
            <Form.Label>Check-in Date</Form.Label>
            <Form.Control 
              type="date" 
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              placeholder="dd/mm/yyyy" 
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="checkOutDate">
            <Form.Label>Check-out Date</Form.Label>
            <Form.Control 
              type="date" 
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              placeholder="dd/mm/yyyy" 
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="roomType">
            <Form.Label>Room Type</Form.Label>
            <Form.Control 
              as="select"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
            >
              <option value="">Select a room type</option>
              <option value="single">Single Room</option>
              <option value="double">Double Room</option>
              <option value="suite">Suite</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md="auto" className="d-flex align-items-end">
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default RoomSearchForm;
