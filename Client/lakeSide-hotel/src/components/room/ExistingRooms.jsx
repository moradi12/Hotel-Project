import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import { deleteRoom, getAllRooms } from "../utils/ApiFunctions";

const ExistingRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      if (result === "") {
        setSuccessMessage(`Room No ${roomId} was deleted`);
        const updatedRooms = rooms.filter((room) => room.id !== roomId);
        setRooms(updatedRooms);
        setFilteredRooms(updatedRooms);
        localStorage.setItem("rooms", JSON.stringify(updatedRooms));
      } else {
        setErrorMessage(`Error deleting room: ${result.message}`);
      }
    } catch (error) {
      setErrorMessage(error.message);
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
                  <td>
                    <button>View / Edit</button>
                    <button onClick={() => handleDelete(room.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <RoomPaginator
            currentPage={currentPage}
            totalPages={calculateTotalPages(filteredRooms, roomsPerPage)}
            onPageChange={handlePaginationClick}
          />
        </section>
      )}
    </div>
  );
};

export default ExistingRooms;
