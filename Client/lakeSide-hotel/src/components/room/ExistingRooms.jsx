import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteRoom, getAllRooms } from "../utils/ApiFunctions";
import './ExistingRooms.css';

const ExistingRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [filter, setFilter] = useState("");
  const notyf = new Notyf();

  // Fetch all rooms when the component mounts
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getAllRooms();
        setRooms(data);
        setFilteredRooms(data); // Initialize the filtered rooms with all rooms
      } catch (error) {
        console.error("Error fetching rooms:", error);
        notyf.error("Error fetching rooms");
      }
    };

    fetchRooms();
  }, []);

  // Handle room deletion
  const handleDelete = async (roomId) => {
    try {
      await deleteRoom(roomId);
      const updatedRooms = rooms.filter((room) => room.id !== roomId);
      setRooms(updatedRooms);
      setFilteredRooms(updatedRooms);
      setSuccessMessage("Room deleted successfully!");
      notyf.success("Room deleted successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error deleting room:", error);
      notyf.error("Error deleting room");
    }
  };

  // Handle filter change
  const handleFilterChange = (event) => {
    const selectedType = event.target.value;
    setFilter(selectedType);

    if (selectedType) {
      const filtered = rooms.filter((room) => room.roomType === selectedType);
      setFilteredRooms(filtered);
    } else {
      setFilteredRooms(rooms);
    }
  };

  return (
    <div className="existing-rooms-container">
      <h1 className="text-center mb-4">Existing Rooms</h1>

      <div className="mb-4 d-flex justify-content-between align-items-center">
        <Link to="/add-room" className="btn btn-success">
          <i className="fa fa-plus me-2"></i> Add New Room
        </Link>
      </div>

      {successMessage && (
        <div className="alert alert-success text-center">
          {successMessage}
        </div>
      )}

      <div className="d-flex justify-content-between mb-3">
        <div>
          <label htmlFor="filter" className="form-label me-2">Filter rooms by type:</label>
          <select
            className="form-select d-inline-block w-auto"
            id="filter"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="">Select a room type...</option>
            {[...new Set(rooms.map((room) => room.roomType))].map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-secondary" onClick={() => setFilter("")}>
          Clear Filter
        </button>
      </div>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Room Type</th>
            <th>Room Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRooms.length > 0 ? (
            filteredRooms.map((room) => (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>{room.roomType}</td>
                <td>{room.roomPrice}</td>
                <td>
                  <div className="btn-group">
                    <Link to={`/edit-room/${room.id}`} className="btn btn-warning" title="Edit Room">
                      <i className="fa fa-edit"></i>
                    </Link>
                    <button onClick={() => handleDelete(room.id)} className="btn btn-danger" title="Delete Room">
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No rooms available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExistingRooms;
