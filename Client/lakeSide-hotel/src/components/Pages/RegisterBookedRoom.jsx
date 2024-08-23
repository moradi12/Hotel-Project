import axios from 'axios';
import React, { useState } from 'react';

const RegisterBookedRoom = () => {
  const [guestFullName, setGuestFullName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [numberOfAdults, setNumberOfAdults] = useState(1);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookedRoom = {
      gustFullName: guestFullName,
      guestEmail: guestEmail,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      numberOfAdults: numberOfAdults,
      numberOfChildren: numberOfChildren,
    };

    try {
      const response = await axios.post('/booked-rooms/register', bookedRoom);
      setMessage(`Booking confirmed! Confirmation code: ${response.data.bookingConfirmationCode}`);
    } catch (error) {
      if (error.response) {
        setMessage(`Error: ${error.response.data}`);
      } else {
        setMessage('An error occurred while processing your request.');
      }
    }
  };

  return (
    <div>
      <h2>Register Booked Room</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Guest Full Name:</label>
          <input
            type="text"
            value={guestFullName}
            onChange={(e) => setGuestFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Guest Email:</label>
          <input
            type="email"
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Check-In Date:</label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Check-Out Date:</label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Number of Adults:</label>
          <input
            type="number"
            value={numberOfAdults}
            onChange={(e) => setNumberOfAdults(parseInt(e.target.value))}
            required
          />
        </div>
        <div>
          <label>Number of Children:</label>
          <input
            type="number"
            value={numberOfChildren}
            onChange={(e) => setNumberOfChildren(parseInt(e.target.value))}
          />
        </div>
        <button type="submit">Register Booking</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterBookedRoom;
