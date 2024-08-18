import React from 'react';
import { Container } from 'react-bootstrap';
import poolImage from '../../assets/OurPool.jpg'; // Import the image
import './Parallax.css'; // Import the CSS file

const Parallax = () => {
  return (
    <>
      <div className='parallax mb-5'></div>
      <Container className='text-center px-5 py-5 justify-content-center'>
        <div className='animated-texts bounceIn'>
          <h1>Welcome to <span className='hotel-color'>LakeSide Hotel</span></h1>
          <h3>We offer the best services for all your needs</h3>
        </div>
      </Container>
      <div className="pool-image-container">
        <img src={poolImage} alt="Our Pool" className="img-fluid pool-image" />
      </div>
    </>
  );
}

export default Parallax;
