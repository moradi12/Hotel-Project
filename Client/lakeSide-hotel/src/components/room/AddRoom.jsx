import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RoomTypeSelector from "../common/RoomTypeSelector";
import { addRoom, getAllRooms } from "../utils/ApiFunctions";

const AddRoom = () => {
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomType: "", 
    roomPrice: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [rooms, setRooms] = useState([]);

  const notyf = new Notyf();

  // Link: fetchRooms function
  useEffect(() => {
    const storedRooms = JSON.parse(localStorage.getItem("rooms"));
    if (storedRooms) {
      setRooms(storedRooms);
    } else {
      fetchRooms(); // Calls the fetchRooms function
    }
  }, []);

  // Link: fetchRooms function
  const fetchRooms = async () => {
    try {
      const fetchedRooms = await getAllRooms(); // Calls the getAllRooms function
      setRooms(fetchedRooms);
      localStorage.setItem("rooms", JSON.stringify(fetchedRooms));
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  // Link: handleRoomInputChange function
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

  // Link: handleImageChange function
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewRoom({ ...newRoom, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  // Link: handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice); // Calls the addRoom function
      if (success) {
        notyf.success("A New Room added successfully");
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
    <>
      <section className="p-4 p-md-5 text-center text-lg-start shadow-1-strong rounded" style={{ backgroundColor: "hsl(0, 0%, 94%)" }}>
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
                  handleRoomInputChange={handleRoomInputChange} // Calls the handleRoomInputChange function
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
                  onChange={handleRoomInputChange} // Calls the handleRoomInputChange function
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
                  onChange={handleImageChange} // Calls the handleImageChange function
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
                <Link to={"existing-rooms"} className="btn btn-outline-info">
                  Back 
                </Link>
                <button className="btn btn-outline-primary ml-2" type="submit">Save Room</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddRoom;
