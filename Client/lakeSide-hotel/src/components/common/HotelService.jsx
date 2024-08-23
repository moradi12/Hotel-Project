import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { FaBriefcase, FaClock, FaDumbbell, FaParking, FaSnowflake, FaSpa, FaTshirt, FaUtensils, FaWifi, FaWineBottle } from "react-icons/fa"; // Added FaBriefcase
import Header from "./Header";

const HotelService = () => {
  return (
    <>
      <Container className="mb-2">
        <Header title="Our Services" />
        <Row>
          <h4 className="text-center">
            Services at <span className="hotel-color">Sunset-Queen-Hotel</span>
            <span className="gap-2">
              <FaClock /> - 24 Hour Front Desk
            </span>
          </h4>
        </Row>
        <Row xs={1} md={2} lg={3} className="g-4 mt-2">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaWifi /> WiFi
                </Card.Title>
                <Card.Text>Stay connected with high-speed internet</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaUtensils /> Breakfast
                </Card.Title>
                <Card.Text>Enjoy a delicious breakfast every morning</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaTshirt /> Laundry
                </Card.Title>
                <Card.Text>Convenient laundry services available</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaWineBottle /> Minibar
                </Card.Title>
                <Card.Text>Enjoy a selection of drinks and snacks in your room</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaParking /> Parking
                </Card.Title>
                <Card.Text>Safe and secure parking available</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaSnowflake /> Air Conditioning
                </Card.Title>
                <Card.Text>Comfortable air-conditioned rooms</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaDumbbell /> Fitness Room
                </Card.Title>
                <Card.Text>Stay active with our fully-equipped fitness room</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaSpa /> Spa
                </Card.Title>
                <Card.Text>Relax and rejuvenate at our luxury spa</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaBriefcase /> Business Center
                </Card.Title>
                <Card.Text>Access to computers, printers, and office essentials</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HotelService;
