import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Component Imports
import Admin from './components/admin/Admin';
import BookingSuccess from './components/common/booking/BookingSuccess';
import Checkout from './components/common/booking/Checkout';
import Home from './components/common/home/Home';
import Login from './components/Pages/Login';
import Profile from './components/Pages/Profile';
import AddRoom from './components/room/AddRoom';
import EditRoom from './components/room/EditRoom';
import ExistingRooms from "./components/room/ExistingRooms";
import RoomListing from './components/room/RoomListing';
import Footer from './layout/Footer';
import NavBar from './layout/NavBar';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
    return () => {
      document.body.classList.remove(theme);
    };
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <main>
      <Router>
        <NavBar toggleTheme={toggleTheme} currentTheme={theme} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit-room/:roomId" element={<EditRoom />} />
          <Route path="/add-room" element={<AddRoom />} />
          <Route path="/book-room/:roomId" element={<Checkout />} />
          <Route path="/browse-all-rooms" element={<RoomListing />} />
          <Route path="/browse-rooms" element={<ExistingRooms />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </Router>
    </main>
  );
}

export default App;
