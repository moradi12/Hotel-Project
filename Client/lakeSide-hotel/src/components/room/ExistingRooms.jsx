import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { FaEdit, FaEye, FaTrashAlt } from 'react-icons/fa'; // Added missing imports
import { Link } from "react-router-dom";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import { deleteRoom, editRoom, getAllRooms } from "../utils/ApiFunctions";

const ExistingRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const notyf = new Notyf();

  useEffect(() => {
    const storedRooms = JSON.parse(localStorage.getItem("rooms"));
    if (storedRooms && storedRooms.length > 0) {
      setRooms(storedRooms);
      setFilteredRooms(storedRooms);
    } else {
      fetchRooms();
    }
  }, []);

  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      const result = await getAllRooms();
      console.log("Fetched rooms:", result);
      setRooms(result);
      setFilteredRooms(result);
      localStorage.setItem("rooms", JSON.stringify(result));
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setErrorMessage("Failed to fetch rooms. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedRoomType === "") {
      setFilteredRooms(rooms);
    } else {
      const filtered = rooms.filter((room) =>
        room.roomType.toLowerCase() === selectedRoomType.toLowerCase()
      );
      setFilteredRooms(filtered);
    }
    setCurrentPage(1);
  }, [rooms, selectedRoomType]);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (roomId) => {
    try {
      const result = await deleteRoom(roomId);

      if (result === 'Room deleted successfully') {
        notyf.success(result);
        setSuccessMessage(result);

        const updateRooms = (roomList) => roomList.filter((room) => room.id !== roomId);
        setRooms(updateRooms);
        setFilteredRooms(updateRooms);

      } else {
        console.error('Error deleting room:', result);
        notyf.error(`Error deleting room: ${result}`);
        setErrorMessage(result);
      }

    } catch (error) {
      const errorMessage = error.message || 'An unexpected error occurred';
      console.error('Error deleting room:', errorMessage);
      notyf.error(`Error deleting room: ${errorMessage}`);
      setErrorMessage(errorMessage);
    }

    // Clear success and error messages after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
    }, 3000);
  };

  const handleEdit = async (roomId, roomType, roomPrice, photo) => {
    try {
      const updatedRoom = await editRoom(roomId, roomType, roomPrice, photo); // Use the API function
      notyf.success('Room successfully edited');
      setRooms(rooms.map(room => room.id === roomId ? updatedRoom : room));
      setFilteredRooms(filteredRooms.map(room => room.id === roomId ? updatedRoom : room));
    } catch (error) {
      console.error('Error editing room:', error);
      notyf.error(`Error editing room: ${error.message || 'An unexpected error occurred'}`);
    }
  };

  const calculateTotalPages = (totalRooms, roomsPerPage) => {
    return Math.ceil(totalRooms / roomsPerPage);
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  return (
    <div>
      {isLoading ? (
        <p>Loading existing rooms...</p>
      ) : (
        <section className="mt-5 mb-5 container">
          <div className="d-flex justify-content-center mb-3 mt-5">
            <h2>Existing Rooms</h2>
          </div>
          <Col md={6} className="mb3 mb-md-0"></Col>
          <div className="row">
            <div className="col-md-6 mb-3 mb-md-0">
              <RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
            </div>
          </div>
          {successMessage && <p className="text-success">{successMessage}</p>}
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          <table className="table table-bordered table-hover">
            <thead>
              <tr className="text-center">
                <th>ID</th>
                <th>Room Type</th>
                <th>Room Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRooms.map((room) => (
                <tr key={room.id} className="text-center">
                  <td>{room.id}</td>
                  <td>{room.roomType}</td>
                  <td>{room.roomPrice}</td>
                  <td className="gap-2">
                    <Link to={`/edit-room/${room.id}`}>
                      <span className="btn btn-info btn-sm">
                        <FaEye />
                      </span>
                    </Link>
                    <Link to={`/edit-room/${room.id}`}>
                      <span className="btn btn-warning btn-sm">
                        <FaEdit />
                      </span>
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(room.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <RoomPaginator
            currentPage={currentPage}
            totalPages={calculateTotalPages(filteredRooms.length, roomsPerPage)}
            onPageChange={handlePaginationClick}
          />
        </section>
      )}
    </div>
  );
};

export default ExistingRooms;
