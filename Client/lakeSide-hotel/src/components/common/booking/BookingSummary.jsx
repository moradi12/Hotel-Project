import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const numberOfDays = checkOutDate.diff(checkInDate, "days");
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const navigate = useNavigate();

  const handleConfirmBooking = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsBookingConfirmed(true);
      onConfirm();
    }, 3000);
  };

  useEffect(() => {
    if (isBookingConfirmed) {
      navigate("/booking-success");
    }
  }, [isBookingConfirmed, navigate]);

  return (
    <div className="card card-body mt-5">
      <h4 className="card-title">Reservation Summary</h4>
      <p>
        Name: <strong>{booking.guestFullName}</strong>
      </p>
      <p>
        Email: <strong>{booking.guestEmail}</strong>
      </p>
      <p>
        Check-in Date: <strong>{checkInDate.format("MMM Do YYYY")}</strong>
      </p>
      <p>
        Check-out Date: <strong>{checkOutDate.format("MMM Do YYYY")}</strong>
      </p>
      <p>
        Number of Days Booked: <strong>{numberOfDays}</strong>
      </p>
      <div>
        <h5>Number of Guests</h5>
        <p>
          Adult{booking.numberOfAdults > 1 ? "s" : ""}: <strong>{booking.numberOfAdults}</strong>
        </p>
        <p>
          Children: <strong>{booking.numberOfChildren}</strong>
        </p>
      </div>
      {payment > 0 ? (
        <>
          <p>
            Total payment: <strong>${payment}</strong>
          </p>
          {isFormValid && !isBookingConfirmed && (
            <Button variant="success" onClick={handleConfirmBooking} disabled={isProcessingPayment}>
              {isProcessingPayment ? (
                <>
                  <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                  Processing Payment...
                </>
              ) : (
                "Confirm Booking & Proceed to Payment"
              )}
            </Button>
          )}
          {isBookingConfirmed && (
            <div className="d-flex justify-content-center align-items-center mt-3">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="text-danger">Check-out date must be after check-in date.</p>
      )}
    </div>
  );
};

export default BookingSummary;
