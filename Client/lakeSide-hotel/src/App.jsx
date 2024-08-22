import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Component Imports
import Admin from './components/admin/Admin';
import BookingSuccess from './components/common/booking/BookingSuccess';
import Checkout from './components/common/booking/Checkout';
import Home from './components/common/home/Home';
import AddRoom from './components/room/AddRoom';
import EditRoom from './components/room/EditRoom';
import ExistingRooms from "./components/room/ExistingRooms";
import RoomListing from './components/room/RoomListing';
import Footer from './layout/Footer';
import NavBar from './layout/NavBar';

function App() {
  return (
    <main>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit-room/:roomId" element={<EditRoom />} />
          <Route path="/add-room" element={<AddRoom />} />
          <Route path="/book-room/:roomId" element={<Checkout />} />
          <Route path="/browse-all-rooms" element={<RoomListing />} />
          <Route path="/browse-rooms" element={<ExistingRooms />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
        </Routes>
        <Footer />
      </Router>
    </main>
  );
}

export default App;
