import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { FaBasketballBall, FaFootballBall, FaHockeyPuck, FaSnowflake, FaSwimmer, FaVolleyballBall } from "react-icons/fa";
import sportsFacilitiesImage from '../../../../lakeSide-hotel/src/assets/SportsFacilities.jpg'; // Import the image

const SportsFacilities = () => {
  return (
    <Container 
      className="mb-4" 
      style={{ 
        padding: '40px', 
        backgroundImage: `url(${sportsFacilitiesImage})`, // Set the background image
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        borderRadius: '8px',
        color: 'white', // Set the text color to white for contrast
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Subtle box shadow for depth
      }}
    >
      {/* Title for SportsFacilities */}
      <h2 style={{ 
        textAlign: 'center', 
        fontWeight: '900', // Increase font weight for boldness
        fontSize: '3.5rem', // Increase font size
        marginBottom: '30px', 
        color: 'white' // Ensures the title text is visible over the image
      }}>
        SportsFacilities
      </h2>

      <Row xs={1} md={2} lg={3} className="g-4">
        <Col>
          <Card 
            style={{ 
              height: '100%', 
              borderRadius: '10px', 
              backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly transparent white background for readability
              color: '#007bff', 
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Card.Body className="d-flex flex-column justify-content-center text-center">
              <Card.Title style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
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
              borderRadius: '10px', 
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              color: '#007bff',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Card.Body className="d-flex flex-column justify-content-center text-center">
              <Card.Title style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
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
              borderRadius: '10px', 
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              color: '#007bff',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Card.Body className="d-flex flex-column justify-content-center text-center">
              <Card.Title style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
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
              borderRadius: '10px', 
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              color: '#007bff',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Card.Body className="d-flex flex-column justify-content-center text-center">
              <Card.Title style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
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
              borderRadius: '10px', 
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              color: '#007bff',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Card.Body className="d-flex flex-column justify-content-center text-center">
              <Card.Title style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
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
              borderRadius: '10px', 
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              color: '#007bff',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Card.Body className="d-flex flex-column justify-content-center text-center">
              <Card.Title style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
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
              borderRadius: '10px', 
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              color: '#007bff',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Card.Body className="d-flex flex-column justify-content-center text-center">
              <Card.Title style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
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
