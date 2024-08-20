import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { FaBasketballBall, FaFootballBall, FaHockeyPuck, FaSnowflake, FaSwimmer, FaVolleyballBall } from "react-icons/fa";
import sportsFacilitiesImage from '../../../../lakeSide-hotel/src/assets/SportsFacilities.jpg'; // Import the image

const SportsFacilities = () => {
  return (
    <Container 
      className="mb-5" 
      style={{ 
        padding: '40px', 
        backgroundImage: `url(${sportsFacilitiesImage})`, // Set the background image
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        borderRadius: '12px',
        color: 'white', // Set the text color to white for contrast
        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)', // Enhanced box shadow for depth
      }}
    >
      {/* Title for SportsFacilities */}
      <h2 style={{ 
        textAlign: 'center', 
        fontWeight: '900', // Increase font weight for boldness
        fontSize: '3.5rem', // Increase font size
        marginBottom: '50px', // Added more space below the title
        color: 'white' // Ensures the title text is visible over the image
      }}>
        SportsFacilities
      </h2>

      <Row xs={1} md={2} lg={3} className="g-4">
        <Col>
          <Card 
            style={{ 
              height: '100%', 
              borderRadius: '15px', 
              background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.8))', // Gradient background for a premium feel
              color: '#007bff', 
              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)', // Added stronger shadow for more depth
              marginBottom: '20px', // Margin bottom for spacing
              transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth hover transition
            }}
            className="hover-shadow" // Adding a hover effect via class
          >
            <Card.Body className="d-flex flex-column justify-content-center text-center">
              <Card.Title style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>
                <FaBasketballBall style={{ marginRight: '10px', fontSize: '2rem' }} /> Basketball
              </Card.Title>
              <Card.Text>Enjoy a game of basketball at our full-sized court.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card 
            style={{ 
              height: '100%', 
              borderRadius: '15px', 
              background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.8))', 
              color: '#007bff',
              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)', 
              marginBottom: '20px', 
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            className="hover-shadow"
          >
            <Card.Body className="d-flex flex-column justify-content-center text-center">
              <Card.Title style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>
                <FaVolleyballBall style={{ marginRight: '10px', fontSize: '2rem' }} /> Tennis
              </Card.Title>
              <Card.Text>Challenge yourself on our professional tennis courts.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card 
            style={{ 
              height: '100%', 
              borderRadius: '15px', 
              background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.8))', 
              color: '#007bff',
              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)', 
              marginBottom: '20px', 
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            className="hover-shadow"
          >
            <Card.Body className="d-flex flex-column justify-content-center text-center">
              <Card.Title style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>
                <FaHockeyPuck style={{ marginRight: '10px', fontSize: '2rem' }} /> Hockey
              </Card.Title>
              <Card.Text>Hit the ice at our indoor hockey rink.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card 
            style={{ 
              height: '100%', 
              borderRadius: '15px', 
              background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.8))', 
              color: '#007bff',
              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)', 
              marginBottom: '20px', 
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            className="hover-shadow"
          >
            <Card.Body className="d-flex flex-column justify-content-center text-center">
              <Card.Title style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>
                <FaFootballBall style={{ marginRight: '10px', fontSize: '2rem' }} /> Football
              </Card.Title>
              <Card.Text>Join a football game on our outdoor field.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card 
            style={{ 
              height: '100%', 
              borderRadius: '15px', 
              background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.8))', 
              color: '#007bff',
              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)', 
              marginBottom: '20px', 
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            className="hover-shadow"
          >
            <Card.Body className="d-flex flex-column justify-content-center text-center">
              <Card.Title style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>
                <FaSnowflake style={{ marginRight: '10px', fontSize: '2rem' }} /> Sauna
              </Card.Title>
              <Card.Text>Relax and unwind in our luxurious sauna.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card 
            style={{ 
              height: '100%', 
              borderRadius: '15px', 
              background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.8))', 
              color: '#007bff',
              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)', 
              marginBottom: '20px', 
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            className="hover-shadow"
          >
            <Card.Body className="d-flex flex-column justify-content-center text-center">
              <Card.Title style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>
                <FaSwimmer style={{ marginRight: '10px', fontSize: '2rem' }} /> Ice Bath
              </Card.Title>
              <Card.Text>Rejuvenate with a refreshing ice bath.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card 
            style={{ 
              height: '100%', 
              borderRadius: '15px', 
              background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.8))', 
              color: '#007bff',
              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.15)', 
              marginBottom: '20px', 
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            className="hover-shadow"
          >
            <Card.Body className="d-flex flex-column justify-content-center text-center">
              <Card.Title style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem' }}>
                <FaSwimmer style={{ marginRight: '10px', fontSize: '2rem' }} /> Olympic Swimming Pool
              </Card.Title>
              <Card.Text>Swim in our Olympic-sized swimming pool.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SportsFacilities;
