import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import AddRoom from "./components/room/AddRoom";
import ExistingRooms from "./components/room/ExistingRooms";

function App() {
  return (
    <Router>
      <div className="container mt-5">
        {/* AddRoom component at the top */}
        <div className="mb-5">
          <AddRoom />
        </div>

        {/* ExistingRooms component below AddRoom */}
        <Routes>
          <Route path="/" element={<ExistingRooms />} />
          {/* Add more routes here if needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
