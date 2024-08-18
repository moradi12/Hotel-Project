import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Component Imports
import Admin from './components/admin/Admin';
import Home from './components/common/home/Home';
import AddRoom from './components/room/AddRoom';
import EditRoom from './components/room/EditRoom';
import ExistingRooms from './components/room/ExistingRooms';
import RoomListing from './components/room/RoomListing';
import Footer from './layout/Footer';
import NavBar from './layout/NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse-rooms" element={<ExistingRooms />} />
        <Route path="/manage-rooms" element={<ExistingRooms />} />
        <Route path="/edit-room/:roomId" element={<EditRoom />} />
        <Route path="/add-room" element={<AddRoom />} />
        <Route path="/browse-all-rooms" element={<RoomListing />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/user" element={<div>User Page</div>} />
        <Route path="/admin" element={<div>Admin Page</div>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
