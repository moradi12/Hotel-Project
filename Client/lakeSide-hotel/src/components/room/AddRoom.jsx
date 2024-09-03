import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RoomTypeSelector from "../common/RoomTypeSelector";
import { addRoom, getAllRooms } from "../utils/ApiFunctions";
import './AddRoom.css';

const AddRoom = () => {
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomType: "", 
    roomPrice: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [rooms, setRooms] = useState([]);
  const [errors, setErrors] = useState({});

  const notyf = new Notyf();

  useEffect(() => {
    const storedRooms = JSON.parse(localStorage.getItem("rooms"));
    if (storedRooms) {
      setRooms(storedRooms);
    } else {
      fetchRooms();
    }
  }, []);

  const fetchRooms = async () => {
    try {
      const fetchedRooms = await getAllRooms();
      setRooms(fetchedRooms);
      localStorage.setItem("rooms", JSON.stringify(fetchedRooms));
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleRoomInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoom((prevRoom) => ({
      ...prevRoom,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setNewRoom((prevRoom) => ({ ...prevRoom, photo: selectedImage }));
      setImagePreview(URL.createObjectURL(selectedImage));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newRoom.photo) {
      newErrors.photo = "Image is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice);
      if (success) {
        notyf.success("New Room added successfully");
        setNewRoom({ photo: null, roomType: "", roomPrice: "" });
        setImagePreview("");
        fetchRooms(); // Refresh the list of rooms after adding a new one
      } else {
        notyf.error("Error adding room");
      }
    } catch (error) {
      console.error("Error adding room:", error);
      notyf.error("Error adding room");
    }
  };

  return (
    <section className="add-room-container p-4 p-md-5 text-center text-lg-start shadow-1-strong rounded" style={{ backgroundColor: "hsl(0, 0%, 94%)" }}>
      <div className="container my-5">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
            <h1 className="my-5 display-5 fw-bold ls-tight">
              Add Room <br />
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="roomType" className="form-label">
                Room Type
              </label>
              <RoomTypeSelector
                handleRoomInputChange={handleRoomInputChange}
                newRoom={newRoom}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="roomPrice" className="form-label">
                Room Price
              </label>
              <input
                className="form-control"
                id="roomPrice"
                name="roomPrice"
                type="number"
                value={newRoom.roomPrice}
                onChange={handleRoomInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="photo" className="form-label">
                Room Photo
              </label>
              <input
                className="form-control"
                id="photo"
                name="photo"
                type="file"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview Room Photo"
                  style={{ maxWidth: "400px", maxHeight: "400px" }}
                  className="mb-3"
                />
              )}
              {errors.photo && <span className="error">{errors.photo}</span>}
            </div>
            <div className="d-grid d-md-flex mt-2">
              <Link to="/existing-rooms" className="btn btn-outline-info">
                Back 
              </Link>
              <button className="btn btn-outline-primary ml-2" type="submit">Save Room</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddRoom;
