import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import AddRoom from "./components/room/AddRoom";
import EditRoom from './components/room/EditRoom';
import ExistingRooms from "./components/room/ExistingRooms";

function App() {
  return (
    <Router>
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
          <Route path="/existing-rooms" element={<ExistingRooms />} />
          {/* Route for editing a specific room */}
          <Route path="/edit-room/:roomId" element={<EditRoom />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
