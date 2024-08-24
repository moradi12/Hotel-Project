import React from 'react';
import MainHeader from '../../../layout/MainHeader'; // Corrected path for MainHeader
import HotelService from '../HotelService';
import Parallax from "../Parallax";
import RoomCarousel from '../RoomCarousel';
import SportsFacilities from '../SportsFacilities';
import RoomSearchForm from '../booking/RoomSearchForm';

const Home = () => {
  return (
    <section>
      <MainHeader />
      <div className="container">
        <RoomCarousel />
        <RoomSearchForm />
        <Parallax />
        <RoomCarousel />
        <HotelService />
        <SportsFacilities />
      </div>
    </section>
  );
};

export default Home;
