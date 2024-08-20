import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import defaultImage from "../../assets/RoomLvl.jpg"; // This is the image you want to use

const RoomCard = ({ room }) => {
  // If the room has a photo, use it; otherwise, use the default image
  const roomImage = room.photo ? `data:image/png;base64,${room.photo}` : defaultImage;

  return (
    <Col key={room.id} className="mb-4" xs={12}>
      <Card>
        <Card.Body className="d-flex flex-wrap align-items-center">
          <div className="flex-shrink-0 mr-3 mb-3 mb-md-0">
            <Card.Img
              variant="top"
              src={roomImage}
              alt="Room Photo"
              style={{ width: "100%", maxWidth: "200px", height: "auto" }}
            />
          </div>
          <div className="flex-grow-1 ml-3 px-5">
            <Card.Title className="hotel-color">{room.roomType}</Card.Title>
            <Card.Title className="hotel-price">${room.roomPrice}/night</Card.Title>
            <Card.Text>
              A cozy {room.roomType} available at our hotel. Enjoy your stay!
            </Card.Text>
          </div>
          <div className="flex-shrink-0 mt-3">
            <Link to={`/book-room/${room.id}`} className="btn btn-hotel btn-sm">
              Book Now
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default RoomCard;
