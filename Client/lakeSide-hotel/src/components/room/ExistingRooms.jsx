import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome Import
import React, { useEffect, useState } from 'react';
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { deleteRoom, getAllRooms } from '../utils/ApiFunctions';

const ExistingRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]); // State for filtered rooms
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [filter, setFilter] = useState(""); // State for filter

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getAllRooms();
        setRooms(data);
        setFilteredRooms(data); // Initialize filteredRooms with all rooms
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const handleDelete = async (roomId) => {
    try {
      await deleteRoom(roomId);
      const updatedRooms = rooms.filter(room => room.id !== roomId);
      setRooms(updatedRooms);
      setFilteredRooms(updatedRooms); // Update filtered rooms
      setSuccessMessage("Room deleted successfully!"); // Set success message

      // Hide the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  const handleFilterChange = (event) => {
    const selectedType = event.target.value;
    setFilter(selectedType);

    if (selectedType) {
      const filtered = rooms.filter(room => room.roomType === selectedType);
      setFilteredRooms(filtered);
    } else {
      setFilteredRooms(rooms);
    }
  };

  return (
    <div>
      <h1 className="text-center mb-4">Existing Rooms</h1>

      <div className="mb-4 d-flex justify-content-between align-items-center">
        <Link to={"/add-room"} className="btn btn-success">
          <FaPlus className="me-2" /> Add New Room
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
          <select className="form-select d-inline-block w-auto" id="filter" value={filter} onChange={handleFilterChange}>
            <option value="">Select a room type...</option>
            <option value="Single bed room">Single bed room</option>
            <option value="Double bed room">Double bed room</option>
            <option value="Triple Suite">Triple Suite</option>
          </select>
        </div>
        <button className="btn btn-secondary" onClick={() => setFilter('')}>Clear Filter</button>
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
          {filteredRooms.map(room => (
            <tr key={room.id}>
              <td>{room.id}</td>
              <td>{room.roomType}</td>
              <td>{room.roomPrice}</td>
              <td>
                <div className="btn-group">
                  <Link to={`/view-room/${room.id}`} className="btn btn-primary" title="View Room">
                    <FaEye />
                  </Link>
                  <Link to={`/edit-room/${room.id}`} className="btn btn-warning" title="Edit Room">
                    <FaEdit />
                  </Link>
                  <button onClick={() => handleDelete(room.id)} className="btn btn-danger" title="Delete Room">
                    <FaTrashAlt />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link" href="#">1</a>
          </li>
          {/* Add more page numbers as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default ExistingRooms;
