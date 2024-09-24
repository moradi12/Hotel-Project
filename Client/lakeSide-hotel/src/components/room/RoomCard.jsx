import { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  const [roomImage, setRoomImage] = useState(null);

  useEffect(() => {
    if (room.photo) {
      // Set the Base64 image directly
      setRoomImage(`data:image/jpeg;base64,${room.photo}`);
    }
  }, [room.photo]);

  return (
    <Col key={room.id} className="mb-4" xs={12} md={6} lg={4}>
      <Card>
        <Card.Body className="d-flex flex-column align-items-start">
          {roomImage ? (
            <Card.Img
              variant="top"
              src={roomImage}
              alt="Room Photo"
              style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }}
            />
          ) : (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                width: "100%",
                maxHeight: "200px",
                backgroundColor: "#f0f0f0",
                textAlign: "center",
                color: "#888",
              }}
            >
              <span>No Image Available</span>
            </div>
          )}
          <div className="mt-3">
            <Card.Title className="hotel-color">{room.roomType}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted hotel-price">
              ${room.roomPrice}/night
            </Card.Subtitle>
            <Card.Text>
              {room.roomDescription || ` ${room.roomType} available at our hotel. Enjoy your stay!`}
            </Card.Text>
            <Card.Text className="mt-2">
              {room.roomDescription && (
                <strong>{room.roomDescription}</strong>
              )}
            </Card.Text>
            <Link to={`/book-room/${room.id}`} className="btn btn-hotel mt-2">
              Book Now
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default RoomCard;
