import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { getAllRooms, getBookingsByRoomId } from '../../utils/ApiFunctions'; // Adjust the import path as necessary
import './RoomSearchForm.css';
const RoomSearchForm = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [roomType, setRoomType] = useState('');
  const [rooms, setRooms] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearched(true);

    try {
      // Fetch all rooms
      const allRooms = await getAllRooms();
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);

      const availableRooms = [];

      // Iterate over all rooms and check availability
      for (let room of allRooms) {
        if (roomType && room.roomType !== roomType) continue;

        const bookings = await getBookingsByRoomId(room.id);
        const isRoomAvailable = bookings.every(booking => {
          const bookingCheckIn = new Date(booking.checkInDate);
          const bookingCheckOut = new Date(booking.checkOutDate);

          // Check if the room is available for the selected dates
          return checkOut <= bookingCheckIn || checkIn >= bookingCheckOut;
        });

        if (isRoomAvailable) {
          availableRooms.push(room);
        }
      }

      setRooms(availableRooms);
      console.log('Available rooms:', availableRooms);

    } catch (error) {
      console.error('Error searching for rooms:', error);
    }
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
      </Row>
      <Row className="justify-content-center mt-3">
        <Col md="auto">
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Col>
      </Row>

      {/* Display search results or a message */}
      {searched && (
        <>
          {rooms.length > 0 ? (
            <Row className="mt-4">
              <Col>
                <h4>Search Results:</h4>
                <ul>
                  {rooms.map(room => (
                    <li key={room.id}>
                      {room.roomType} - ${room.roomPrice} 
                      (Available)
                    </li>
                  ))}
                </ul>
              </Col>
            </Row>
          ) : (
            <Row className="mt-4">
              <Col>
                <h4>No rooms available for the selected dates.</h4>
              </Col>
            </Row>
          )}
        </>
      )}
    </Form>
  );
};

export default RoomSearchForm;
