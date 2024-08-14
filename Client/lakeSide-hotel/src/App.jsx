import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import AddRoom from "./components/room/AddRoom";
import EditRoom from './components/room/EditRoom';
import ExistingRooms from "./components/room/ExistingRooms";
import { RoomListing } from './components/room/RoomListing.jsx';
import { Footer } from './layout/Footer.jsx';
import NavBar from './layout/NavBar.jsx';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container mt-5">
        <Routes>
          <Route 
            path="/" 
            element={
              <div>
                <AddRoom />
                <ExistingRooms />
              </div>
            } 
          />
          <Route path="/browse-rooms" element={<ExistingRooms />} />
          <Route path="/manage-rooms" element={<ExistingRooms />} />
          <Route path="/edit-room/:roomId" element={<EditRoom />} />
          <Route path="/add-room" element={<AddRoom />} />
          <Route path="/browse-all-rooms" element={<RoomListing />} />

          <Route path="/user" element={<div>User Page</div>} />
          <Route path="/admin" element={<div>Admin Page</div>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
