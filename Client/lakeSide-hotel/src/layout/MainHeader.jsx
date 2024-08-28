import React from 'react';
import hotelImage from '../assets/hotelImage.jpg'; // עדכון הנתיב לתמונה
import './MainHeader.css';

const MainHeader = () => {
  return (
    <header className='header-banner' style={{ backgroundImage: `url(${hotelImage})` }}>
      <div className='overlay'></div>
      <div className='animated-text overlay-content'>
        <h1>
          Welcome to <span className="colors">Sunset Queen Hotel</span>
        </h1>
        <h4>Experience The Best Hospitality In Town</h4>
      </div>
    </header>
  );
};

export default MainHeader;
