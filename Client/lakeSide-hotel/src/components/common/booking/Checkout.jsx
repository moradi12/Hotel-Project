import React from 'react';
import BookingForm from '../booking/BookingForm';

const Checkout = () => {
  return (
    <div className="checkout-page container my-5">
      <h2 className="text-center mb-4">Complete Your Booking</h2>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <BookingForm />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
