import React from 'react';
import { Container } from 'react-bootstrap';
import allImage from '../../assets/all.jpg';
import poolImage from '../../assets/OurPool.jpg';
import './Parallax.css';

const Parallax = () => {
  return (
    <>
      <Container className='text-center px-5 py-5 justify-content-center'>
        <div className='animated-texts bounceIn'>
          <h1>
            Welcome to <span className='hotel-color'>Sunset Queen Hotel</span>
          </h1>
          <h3>We offer the best services for all your needs</h3>
        </div>
      </Container>

      <div className="additional-image-container">
        <img src={allImage} alt="Additional View" className="img-fluid additional-image" />
      </div>

      <Container className='about-us text-center px-5 py-3 justify-content-center'>
        <h2>About Us</h2>
        <p className="about-text">
          At Sunset Queen Hotel, we take immense pride in offering unparalleled hospitality and luxurious accommodations 
          to every guest. Whether you are here for a serene vacation or an important business engagement, our hotel 
          provides the perfect fusion of comfort, elegance, and convenience. With breathtaking lake views, state-of-the-art 
          amenities, and exceptional service, we are committed to ensuring that your stay with us is nothing short of extraordinary.
        </p>
      </Container>

      <div className="pool-image-container mb-0">
        <img src={poolImage} alt="Our Pool" className="img-fluid pool-image" />
      </div>
    </>
  );
}

export default Parallax;
