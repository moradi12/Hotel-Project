import React from 'react';
import MainHeader from '../../../layout/MainHeader'; // Importing MainHeader from the correct path
import HotelService from '../HotelService'; // Importing HotelService component
import Parallax from "../Parallax";
import RoomCarousel from '../RoomCarousel';
import SportsFacilities from '../SportsFacilities'; // Importing SportsFacilities component
import RoomSearchForm from '../booking/RoomSearchForm'; // Importing RoomSearchForm component

const Home = () => {
  return (
    <section>
      <MainHeader />
      <div className="container">
        <RoomCarousel />
        <RoomSearchForm /> {/* Adding the RoomSearchForm here */}
        <Parallax />
        <RoomCarousel />
        <HotelService />
        {/* New Sports Facilities Section */}
        <SportsFacilities />
      </div>
    </section>
  );
};

export default Home;
