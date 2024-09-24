import React from 'react';
import serviceImage from '../../assets/service.jpg'; // נתיב יחסי לתמונה
import './Header.css';

const Header = ({ title }) => {
  return (
    <header className='header' style={{ backgroundImage: `url(${serviceImage})` }}>
      <div className='overlay'></div>
      <div className='container'>
        <h1 className='header-title text-center'>{title}</h1>
      </div>
    </header>
  );
}

export default Header;
