import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteBooking, getAllBookings } from '../../utils/ApiFunctions';
import BookingSummary from './BookingSummary'; // Reuse the existing BookingSummary component
import './ManageBookings.css'; // Ensure this CSS file exists or is created

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [filter, setFilter] = useState('');
  const notyf = new Notyf();

  useEffect(() => {
    // Fetch all bookings when the component mounts
    const fetchBookings = async () => {
      try {
        const data = await getAllBookings(); // Fetch all bookings from the API
        setBookings(data);
        setFilteredBookings(data); // Initialize filtered bookings with all bookings
      } catch (error) {
        console.error('Error fetching bookings:', error);
        notyf.error('Error fetching bookings');
      }
    };
    fetchBookings();
  }, []);

  const handleDelete = async (bookingId) => {
    try {
      await deleteBooking(bookingId); // Call API to delete the booking
      const updatedBookings = bookings.filter((booking) => booking.id !== bookingId);
      setBookings(updatedBookings);
      setFilteredBookings(updatedBookings); // Update state after deletion
      notyf.success('Booking deleted successfully!');
    } catch (error) {
      console.error('Error deleting booking:', error);
      notyf.error('Error deleting booking');
    }
  };

  const handleFilterChange = (event) => {
    const selectedStatus = event.target.value;
    setFilter(selectedStatus);

    if (selectedStatus) {
      const filtered = bookings.filter((booking) => booking.status === selectedStatus);
      setFilteredBookings(filtered); // Filter bookings based on the selected status
    } else {
      setFilteredBookings(bookings); // Reset to show all bookings if no filter is selected
    }
  };

  const renderBookings = () => {
    return filteredBookings.map((booking) => (
      <div key={booking.id}>
        <BookingSummary booking={booking} payment={booking.payment} />
        <button onClick={() => handleDelete(booking.id)} className="btn btn-danger">Delete</button>
      </div>
    ));
  };

  return (
    <div className="manage-bookings-container">
      <h1 className="text-center mb-4">Manage Bookings</h1>

      <div className="mb-4 d-flex justify-content-between align-items-center">
        <Link to="/add-booking" className="btn btn-success">
          <i className="fa fa-plus me-2"></i> Add New Booking
        </Link>
      </div>

      <div className="d-flex justify-content-between mb-3">
        <div>
          <label htmlFor="filter" className="form-label me-2">Filter bookings by status:</label>
          <select
            className="form-select d-inline-block w-auto"
            id="filter"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="">Select a booking status...</option>
            {[...new Set(bookings.map((booking) => booking.status))].map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-secondary" onClick={() => setFilter('')}>
          Clear Filter
        </button>
      </div>

      <div className="booking-list">
        {filteredBookings.length > 0 ? (
          renderBookings()
        ) : (
          <div className="text-center">No bookings available.</div>
        )}
      </div>
    </div>
  );
};

export default ManageBookings;
