import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RoomPaginator from '../common/RoomPaginator';
import { deleteRoom, getAllRooms } from '../utils/ApiFunctions';
import RoomCard from './RoomCard';
import './RoomManagement.css';

const RoomManagement = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(6);
  const [filter, setFilter] = useState('');
  const notyf = new Notyf();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getAllRooms();
        setRooms(data);
        setFilteredRooms(data); // Initialize the filtered rooms with all rooms
      } catch (error) {
        console.error('Error fetching rooms:', error);
        notyf.error('Error fetching rooms');
      }
    };
    fetchRooms();
  }, []);

  const handleDelete = async (roomId) => {
    try {
      await deleteRoom(roomId);
      const updatedRooms = rooms.filter((room) => room.id !== roomId);
      setRooms(updatedRooms);
      setFilteredRooms(updatedRooms);
      notyf.success('Room deleted successfully!');
    } catch (error) {
      console.error('Error deleting room:', error);
      notyf.error('Error deleting room');
    }
  };
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
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);

  const renderRooms = () => {
    const startIndex = (currentPage - 1) * roomsPerPage;
    const endIndex = startIndex + roomsPerPage;

    return filteredRooms.slice(startIndex, endIndex).map((room) => (
      <RoomCard key={room.id} room={room} onDelete={handleDelete} />
    ));
  };

  return (
    <div className="room-management-container">
      <h1 className="text-center mb-4">Room Management</h1>

      <div className="mb-4 d-flex justify-content-between align-items-center">
        <Link to="/add-room" className="btn btn-success">
          <i className="fa fa-plus me-2"></i> Add New Room
        </Link>
      </div>

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
        <button className="btn btn-secondary" onClick={() => setFilter('')}>
          Clear Filter
        </button>
      </div>

      <div className="room-list">
        {filteredRooms.length > 0 ? (
          renderRooms()
        ) : (
          <div className="text-center">No rooms available.</div>
        )}
      </div>

      {totalPages > 1 && (
        <RoomPaginator
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default RoomManagement;
