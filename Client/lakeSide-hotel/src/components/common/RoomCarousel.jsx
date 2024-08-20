import React, { useEffect, useState } from "react";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllRooms } from "../utils/ApiFunctions";

const RoomCarousel = () => {
  const [rooms, setRooms] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllRooms()
      .then((data) => {
        if (Array.isArray(data)) {
          setRooms(data);
        } else {
          setErrorMessage("Invalid data format received from API.");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message || "An unexpected error occurred.");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading rooms...</div>;
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  if (rooms.length === 0) {
    return <div>No rooms available.</div>;
  }

  return (
    <section className="bg-light mb-5 mt-5 shadow">
      <Link to={"/browse-all-rooms"} className="hotel-color text-center">
        Browse all rooms
      </Link>

      <Container>
        <Carousel indicators={false}>
          {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
            <Carousel.Item key={index}>
              <Row>
                {rooms.slice(index * 4, index * 4 + 4).map((room) => (
                  <Col key={room.id} className="mb-4" xs={12} md={6} lg={3}>
                    <Card>
                      <Link to={`/book-room/${room.id}`}>
                        <Card.Img
                          variant="top"
                          src={room.photo ? `data:image/png;base64,${room.photo}` : "/path/to/default/image.png"}
                          alt={`${room.roomType} Photo`}
                          className="w-100"
                          style={{ height: "200px", objectFit: "cover" }}
                          loading="lazy" // Lazy loading for performance
                        />
                      </Link>
                      <Card.Body>
                        <Card.Title className="hotel-color">{room.roomType}</Card.Title>
                        <Card.Title className="room-price">${room.roomPrice}/night</Card.Title>
                        <div className="flex-shrink-0">
                          <Link className="btn btn-sm btn-hotel" to={`/book-room/${room.id}`}>
                            Book Now
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

export default RoomCarousel;
