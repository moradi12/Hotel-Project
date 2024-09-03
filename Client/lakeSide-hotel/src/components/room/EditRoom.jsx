import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RoomTypeSelector from "../common/RoomTypeSelector";
import { getRoomById, updateRoom } from "../utils/ApiFunctions";

const EditRoom = () => {
  const { roomId } = useParams();
  const [room, setRoom] = useState({
    photo: null,
    roomType: "",
    roomPrice: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});
  const notyf = new Notyf();

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const roomData = await getRoomById(roomId);
        if (roomData) {
          setRoom({
            roomType: roomData.roomType,
            roomPrice: roomData.roomPrice,
            photo: null, // Reset the photo as no new photo is selected initially
          });
          setImagePreview(`data:image/jpeg;base64,${roomData.photo}`);
        } else {
          notyf.error("Room data not found.");
        }
      } catch (error) {
        notyf.error("Error fetching room data.");
        console.error("Error fetching room data:", error);
      }
    };

    fetchRoomData();
  }, [roomId]);

  const handleRoomInputChange = (e) => {
    const { name, value } = e.target;
    setRoom((prevRoom) => ({
      ...prevRoom,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setRoom((prevRoom) => ({ ...prevRoom, photo: selectedImage }));
      setImagePreview(URL.createObjectURL(selectedImage));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!room.roomType) {
      newErrors.roomType = "Room type is required";
    }
    if (!room.roomPrice) {
      newErrors.roomPrice = "Room price is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const success = await updateRoom(roomId, room);
      if (success) {
        notyf.success("Room updated successfully");
        setImagePreview(""); // Reset the image preview
      } else {
        notyf.error("Error updating room");
      }
    } catch (error) {
      console.error("Error updating room:", error);
      notyf.error("Error updating room");
    }
  };

  return (
    <section className="edit-room-container p-4 p-md-5 text-center text-lg-start shadow-1-strong rounded" style={{ backgroundColor: "hsl(0, 0%, 94%)" }}>
      <div className="container my-5">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
            <h1 className="my-5 display-5 fw-bold ls-tight">
              Edit Room <br />
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="roomType" className="form-label">
                Room Type
              </label>
              <RoomTypeSelector
                handleRoomInputChange={handleRoomInputChange}
                newRoom={room}
              />
              {errors.roomType && <span className="error">{errors.roomType}</span>}
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
                value={room.roomPrice}
                onChange={handleRoomInputChange}
              />
              {errors.roomPrice && <span className="error">{errors.roomPrice}</span>}
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
            </div>
            <div className="d-grid d-md-flex mt-2">
              <Link to="/existing-rooms" className="btn btn-outline-info">
                Back 
              </Link>
              <button className="btn btn-outline-primary ml-2" type="submit">Save Changes</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditRoom;
