import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Importing useLocation and useNavigate hooks
import Header from "../Header"; // Adjust the import path according to your project structure

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message;
  const error = location.state?.error;

  const handleBackToHome = () => {
    navigate("/"); // Redirect to homepage or another relevant page
  };

  return (
    <div className="container">
      <Header title="Booking Status" />
      <div className="mt-5 text-center">
        {message ? (
          <div>
            <h3 className="text-success">Booking Success!</h3>
            <p className="text-success">{message}</p>
          </div>
        ) : (
          <>
            <h3 className="text-danger">Error Booking Room!</h3>
            <p className="text-danger">{error}</p>
          </>
        )}
        <button className="btn btn-primary mt-4" onClick={handleBackToHome}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default BookingSuccess;
