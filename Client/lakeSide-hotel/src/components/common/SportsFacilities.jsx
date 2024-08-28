import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { FaBasketballBall, FaBiking, FaBowlingBall, FaFootballBall, FaHockeyPuck, FaSnowflake, FaSwimmer, FaVolleyballBall } from "react-icons/fa";
import sportsFacilitiesImage from '../../../../lakeSide-hotel/src/assets/SportsFacilities.jpg'; // Import the image

const SportsFacilities = () => {
  return (
    <Container 
      className="mb-5" 
      style={{ 
        padding: '40px', 
        backgroundImage: `url(${sportsFacilitiesImage})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        borderRadius: '12px',
        color: 'white', 
        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)', 
      }}
    >
      <h2 style={{ 
        textAlign: 'center', 
        fontWeight: '900', 
        fontSize: '3.5rem', 
        marginBottom: '50px', 
        color: 'white' 
      }}>
        Sports Facilities
      </h2>

      <Row xs={1} md={2} lg={3} className="g-4">
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
                <FaBasketballBall style={{ marginRight: '10px', fontSize: '2rem', color: '#ff5722' }} /> Basketball
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
                <FaVolleyballBall style={{ marginRight: '10px', fontSize: '2rem', color: '#ffeb3b' }} /> Tennis
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
                <FaHockeyPuck style={{ marginRight: '10px', fontSize: '2rem', color: '#2196f3' }} /> Hockey
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
                <FaFootballBall style={{ marginRight: '10px', fontSize: '2rem', color: '#4caf50' }} /> Football
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
                <FaSnowflake style={{ marginRight: '10px', fontSize: '2rem', color: '#00bcd4' }} /> Sauna
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
                <FaVolleyballBall style={{ marginRight: '10px', fontSize: '2rem', color: '#ff9800' }} /> Volleyball
              </Card.Title>
              <Card.Text>Enjoy a competitive game of volleyball on our sand courts.</Card.Text>
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
                <FaSwimmer style={{ marginRight: '10px', fontSize: '2rem', color: '#3f51b5' }} /> Olympic Swimming Pool
              </Card.Title>
              <Card.Text>Swim in our Olympic-sized swimming pool.</Card.Text>
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
                <FaBowlingBall style={{ marginRight: '10px', fontSize: '2rem', color: '#9c27b0' }} /> Bowling Alley
              </Card.Title>
              <Card.Text>Have a blast with friends at our modern bowling alley.</Card.Text>
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
                <FaBiking style={{ marginRight: '10px', fontSize: '2rem', color: '#e91e63' }} /> Cycling
              </Card.Title>
              <Card.Text>Explore scenic routes with our cycling facilities.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SportsFacilities;
