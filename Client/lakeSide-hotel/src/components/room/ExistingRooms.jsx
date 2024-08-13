import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome Import
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteRoom, getAllRooms } from '../utils/ApiFunctions';

const ExistingRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getAllRooms();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
  }, []);

  const handleDelete = async (roomId) => {
    try {
      await deleteRoom(roomId);
      setRooms(rooms.filter(room => room.id !== roomId));
      setSuccessMessage("Room deleted successfully!"); // Set success message

      // Hide the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  return (
    <div>
      <h1 className="text-center mb-4">Existing Rooms</h1>

      {successMessage && (
        <div className="alert alert-success text-center">
          {successMessage}
        </div>
      )}
      
      <div className="d-flex justify-content-between mb-3">
        <div>
          <label htmlFor="filter" className="form-label me-2">Filter rooms by type</label>
          <select className="form-select d-inline-block w-auto" id="filter">
            <option value="">select a room type to filter...</option>
            {/* Populate this dynamically based on your data */}
            <option value="Single bed room">Single bed room</option>
            <option value="Double bed room">Double bed room</option>
            <option value="Triple Suite">Triple Suite</option>
          </select>
        </div>
        <button className="btn btn-danger">Clear Filter</button>
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
          {rooms.map(room => (
            <tr key={room.id}>
              <td>{room.id}</td>
              <td>{room.roomType}</td>
              <td>{room.roomPrice}</td>
              <td>
                <div className="btn-group">
                  <Link to={`/view-room/${room.id}`} className="btn btn-primary">
                    <i className="fas fa-eye"></i> {/* View Icon */}
                  </Link>
                  <Link to={`/edit-room/${room.id}`} className="btn btn-warning">
                    <i className="fas fa-edit"></i> {/* Edit Icon */}
                  </Link>
                  <button onClick={() => handleDelete(room.id)} className="btn btn-danger">
                    <i className="fas fa-trash-alt"></i> {/* Delete Icon */}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          {/* Add more page numbers as needed */}
        </ul>
      </nav>
    </div>
  );
};

export default ExistingRooms;
