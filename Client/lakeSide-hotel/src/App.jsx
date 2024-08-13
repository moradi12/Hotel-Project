import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import AddRoom from "./components/room/AddRoom";
import EditRoom from './components/room/EditRoom';
import ExistingRooms from "./components/room/ExistingRooms";
import { Footer } from './layout/Footer.jsx';
import NavBar from './layout/NavBar.jsx';

function App() {
  return (
    <Router>
      <NavBar />
      <div className="container mt-5">
        <Routes>
          {/* Main Page showing AddRoom and ExistingRooms */}
          <Route 
            path="/" 
            element={
              <div>
                <AddRoom />
                <ExistingRooms />
              </div>
            } 
          />
          {/* Route for viewing Existing Rooms */}
          <Route path="/browse-rooms" element={<ExistingRooms />} />
          {/* Route for managing rooms */}
          <Route path="/manage-rooms" element={<ExistingRooms />} />
          {/* Route for editing a specific room */}
          <Route path="/edit-room/:roomId" element={<EditRoom />} />
          {/* Route for adding a room */}
          <Route path="/add-room" element={<AddRoom />} />
          {/* Other possible routes */}
          <Route path="/user" element={<div>User Page</div>} />
          <Route path="/admin" element={<div>Admin Page</div>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
