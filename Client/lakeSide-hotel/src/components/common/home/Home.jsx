import React from 'react';
import MainHeader from '../../../layout/MainHeader'; // Importing MainHeader from the correct path
import HotelService from './HotelService'; // Importing HotelService component
import Parallax from './Parallax'; // Importing Parallax component

const Home = () => {
  return (
    <section>
      <MainHeader />
      <section className="container">
        <Parallax />
        <HotelService />
        <Parallax />
      </section>
    </section>
  );
};

export default Home;
