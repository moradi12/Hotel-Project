import { differenceInDays, isAfter, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { bookRoom, getRoomById } from "../../utils/ApiFunctions";
import BookingSummary from "../booking/BookingSummary";

const BookingForm = () => {
  const [isValidated, setIsValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [roomPrice, setRoomPrice] = useState(0);
  const [booking, setBooking] = useState({
    guestFullName: "",
    guestEmail: "",
    checkInDate: "",
    checkOutDate: "",
    numberOfAdults: "",
    numberOfChildren: "",
  });

  const { roomId } = useParams();
  const navigate = useNavigate();

  const getRoomPriceById = async (roomId) => {
    try {
      const response = await getRoomById(roomId);
      setRoomPrice(response.roomPrice);
    } catch (error) {
      setErrorMessage("Failed to fetch room price. Please try again later.");
    }
  };

  useEffect(() => {
    if (roomId) {
      getRoomPriceById(roomId);
    }
  }, [roomId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
    setErrorMessage("");
  };

  const calculatePayment = () => {
    const checkInDate = parseISO(booking.checkInDate);
    const checkOutDate = parseISO(booking.checkOutDate);
    const diffInDays = differenceInDays(checkOutDate, checkInDate);
    const price = roomPrice || 0;
    return diffInDays * price;
  };

  const isGuestCountValid = () => {
    const adultCount = parseInt(booking.numberOfAdults, 10);
    const childrenCount = parseInt(booking.numberOfChildren, 10);
    const totalCount = adultCount + childrenCount;
    return totalCount >= 1 && adultCount >= 1;
  };

  const isCheckOutDateValid = () => {
    if (!isAfter(parseISO(booking.checkOutDate), parseISO(booking.checkInDate))) {
      setErrorMessage("Check-out date must be after the check-in date.");
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()) {
      e.stopPropagation();
      setErrorMessage("Please correct the errors before submitting.");
    } else {
      setIsSubmitted(true);
    }
    setIsValidated(true);
  };

  const handleBooking = async () => {
    try {
      const confirmationCode = await bookRoom(roomId, booking);
      setIsSubmitted(true);
      navigate("/booking-success", { state: { message: confirmationCode } });
    } catch (error) {
      setErrorMessage("Booking failed. Please try again later.");
    }
  };

  return (
    <div className="container mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card card-body mt-5">
            <h4 className="card-title text-center">Reserve Room</h4>
            <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="guestFullName">Full Name :</Form.Label>
                <Form.Control
                  required
                  type="text"
                  id="guestFullName"
                  name="guestFullName"
                  value={booking.guestFullName}
                  placeholder="Enter your full name"
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your full name
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="guestEmail">Email :</Form.Label>
                <Form.Control
                  required
                  type="email"
                  id="guestEmail"
                  name="guestEmail"
                  value={booking.guestEmail}
                  placeholder="Enter your email"
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email address
                </Form.Control.Feedback>
              </Form.Group>

              <fieldset style={{ border: "2px solid #ccc" }}>
                <legend>Lodging Period</legend>
                <div className="row">
                  <div className="col-6">
                    <Form.Group>
                      <Form.Label htmlFor="checkInDate">Check-In Date :</Form.Label>
                      <Form.Control
                        required
                        type="date"
                        id="checkInDate"
                        name="checkInDate"
                        value={booking.checkInDate}
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please select a check-in date
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-6">
                    <Form.Group>
                      <Form.Label htmlFor="checkOutDate">Check-Out Date :</Form.Label>
                      <Form.Control
                        required
                        type="date"
                        id="checkOutDate"
                        name="checkOutDate"
                        value={booking.checkOutDate}
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please select a check-out date
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </div>
              </fieldset>

              <fieldset style={{ border: "2px solid #ccc" }} className="mt-3">
                <legend>Guests Information</legend>
                <Form.Group>
                  <Form.Label htmlFor="numberOfAdults">Number of Adults :</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    id="numberOfAdults"
                    name="numberOfAdults"
                    value={booking.numberOfAdults}
                    placeholder="Enter number of adults"
                    onChange={handleInputChange}
                    min="1"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter the number of adults
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor="numberOfChildren">Number of Children :</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    id="numberOfChildren"
                    name="numberOfChildren"
                    value={booking.numberOfChildren}
                    placeholder="Enter number of children"
                    onChange={handleInputChange}
                    min="0"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter the number of children
                  </Form.Control.Feedback>
                </Form.Group>
              </fieldset>

              {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}

              <div className="form-group mt-3 mb-2 text-center">
                <button type="submit" className="btn btn-hotel">
                  Continue
                </button>
              </div>
            </Form>

            {isSubmitted && (
              <div className="mt-3">
                <BookingSummary
                  booking={booking}
                  payment={calculatePayment()}
                  isFormValid={isValidated}
                  onConfirm={handleBooking}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
