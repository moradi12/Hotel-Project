import React from 'react';
import MainHeader from '../../../layout/MainHeader'; // Importing MainHeader from the correct path
import HotelService from '../HotelService'; // Importing HotelService component
import Parallax from "../Parallax";
import RoomCarousel from '../RoomCarousel';
const Home = () => {
  return (
    <section>
      <MainHeader />
      <div className="container">
        <RoomCarousel/>
        <Parallax />
        <RoomCarousel/>
        <HotelService />
        <Parallax />
        <RoomCarousel/>
      </div>
    </section>
  );
};

export default Home;
