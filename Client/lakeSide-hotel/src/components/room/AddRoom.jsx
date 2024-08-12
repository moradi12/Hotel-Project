import React, { useEffect, useState } from "react";
import RoomTypeSelector from "../common/RoomTypeSelector";
import { addRoom, getAllRooms } from "../utils/ApiFunctions";

const AddRoom = () => {
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomType: "", 
    roomPrice: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [rooms, setRooms] = useState([]);

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
    const name = e.target.name;
    let value = e.target.value;
    if (name === "roomPrice") {
      if (!isNaN(value)) {
        value = parseInt(value);
      } else {
        value = "";
      }
    }
    setNewRoom({ ...newRoom, [name]: value });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewRoom({ ...newRoom, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice);
      if (success) {
        setSuccessMessage("A New Room added successfully");
        setNewRoom({ photo: null, roomType: "", roomPrice: "" });
        setImagePreview("");
        setErrorMessage("");
        fetchRooms();
      } else {
        setErrorMessage("Error adding room");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error adding room:", error);
      setErrorMessage("Error adding room");
      setSuccessMessage("");
    }

    setTimeout(()=>
      {setSuccessMessage("")
        setErrorMessage("")
      },3000)
  };

  return (
    <>
      <section className="p-4 p-md-5 text-center text-lg-start shadow-1-strong rounded" style={{ backgroundColor: "hsl(0, 0%, 94%)" }}>
        <div className="container my-5">
          <div className="row gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
              <h1 className="my-5 display-5 fw-bold ls-tight">
                Add Room <br />
              </h1>
            </div>
            {successMessage && (
              <div className="alert alert-success fade show">{successMessage}     </div>
            )}


            {errorMessage && (
              <div className="alert alert-denger fade show">{errorMessage}     </div>
            )}















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
              </div>
              <div className="d-grid d-md-flex mt-2">
                <button className="btn btn-outline-primary ml-5" type="submit">Save Room</button>
              </div>
            </form>
            {successMessage && (
              <div className="alert alert-success mt-3">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="alert alert-danger mt-3">{errorMessage}</div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default AddRoom;
