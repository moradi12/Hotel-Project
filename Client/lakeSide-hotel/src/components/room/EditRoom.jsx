import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import RoomTypeSelector from "../common/RoomTypeSelector";
import { getRoomById, updateRoom } from "../utils/ApiFunctions";

const EditRoom = () => {
  const [room, setRoom] = useState({
    roomType: "",
    roomPrice: "",
    photo: null,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const { roomId } = useParams();

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const roomData = await getRoomById(roomId);
        if (roomData) {
          setRoom(roomData);
          setImagePreview(roomData.photo); // Assuming roomData.photo is a URL
        } else {
          setErrorMessage("Room data not found");
        }
      } catch (error) {
        console.error("Error fetching room data:", error);
        setErrorMessage("Error fetching room data");
      }
    };

    fetchRoomData();
  }, [roomId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRoom({ ...room, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setRoom({ ...room, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('roomType', room.roomType);
      formData.append('roomPrice', room.roomPrice);
      if (room.photo) {
        formData.append('photo', room.photo);
      }

      const response = await updateRoom(roomId, formData);
      if (response.status === 200) {
        setSuccessMessage("Room updated successfully!");
        setErrorMessage("");
      } else {
        setErrorMessage("Error updating room");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error updating room:", error);
      setErrorMessage("Error updating room");
      setSuccessMessage("");
    }

    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  return (
    <>
      <section className="p-4 p-md-5 text-center text-lg-start shadow-1-strong rounded" style={{ backgroundColor: "hsl(0, 0%, 94%)" }}>
        <div className="container my-5">
          <div className="row gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
              <h1 className="my-5 display-5 fw-bold ls-tight">
                Edit Room <br />
              </h1>
            </div>
            {successMessage && (
              <div className="alert alert-success fade show">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="alert alert-danger fade show">{errorMessage}</div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="roomType" className="form-label">
                  Room Type
                </label>
                <RoomTypeSelector
                  handleRoomInputChange={handleInputChange}
                  newRoom={room} // Passing the room state as newRoom prop
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
                  value={room.roomPrice}
                  onChange={handleInputChange}
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
              </div>
              <div className="d-grid d-md-flex mt-2">
                <Link to="/existing-rooms" className="btn btn-outline-info mr-2">
                  Back
                </Link>
                <button className="btn btn-outline-primary" type="submit">Edit Room</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditRoom;
