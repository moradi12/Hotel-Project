import { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  const [roomImage, setRoomImage] = useState(null);

  useEffect(() => {
    // if (room.photoFilename) {
    //   // Dynamically import the image based on the room's photoFilename
    //   import(`../../assets/${room.photoFilename}`)
    //     .then((image) => setRoomImage(image.default))
    //     .catch((err) =>
    //       console.error(`Failed to load image ${room.photoFilename}`, err)
    //     );
    // }
    console.log(room.photoFilename)
  }, []);

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
              A cozy {room.roomType} available at our hotel. Enjoy your stay!
            </Card.Text>
            <Link to={`/book-room/${room.id}`} className="btn btn-hotel">
              Book Now
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default RoomCard;
