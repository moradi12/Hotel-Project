import React from 'react';
import { Container } from 'react-bootstrap'; // Added import for Container

const Parallax = () => {
  return (
    <>
      <div className='parallax mb-5'></div>
      <Container className='text-center px-5 py-5 justify-content-center'>
        <div className='animated-texts bounceIn'>
          <h1>Welcome to <span className='hotel-color'>LakeSide Hotel</span></h1>
          <h3>We offer the best services for all you needs</h3>
        </div>
      </Container>
    </>
  );
}

export default Parallax;
