import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getRoomTypes } from "../utils/ApiFunctions";

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  useEffect(() => {
    getRoomTypes()
      .then((data) => setRoomTypes(data))
      .catch((error) => console.error("Error fetching room types:", error));
  }, []);

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomType(e.target.value);
  };

  const handleAddNewRoomType = () => {
    if (newRoomType.trim() !== "") {
      if (!roomTypes.includes(newRoomType)) {
        setRoomTypes([...roomTypes, newRoomType]);
        handleRoomInputChange({
          target: { name: "roomType", value: newRoomType },
        });
        setFeedbackMessage("New room type added successfully!");
        setTimeout(() => setFeedbackMessage(""), 3000);
      } else {
        setFeedbackMessage("Room type already exists!");
        setTimeout(() => setFeedbackMessage(""), 3000);
      }
      setNewRoomType("");
      setShowNewRoomTypeInput(false);
    }
  };

  const handleRoomTypeChange = (e) => {
    const { value } = e.target;
    if (value === "Add New") {
      setShowNewRoomTypeInput(true);
    } else {
      handleRoomInputChange(e);
      setShowNewRoomTypeInput(false);
    }
  };

  return (
    <>
      <select
        id="roomType"
        name="roomType"
        value={newRoom.roomType}
        onChange={handleRoomTypeChange}
        className="form-select"
      >
        <option value="">Select a room type</option>
        {roomTypes.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
        <option value="Add New">Add New</option>
      </select>
      {showNewRoomTypeInput && (
        <div className="input-group mt-3">
          <input
            className="form-control"
            type="text"
            placeholder="Enter a new room type"
            value={newRoomType}
            onChange={handleNewRoomTypeInputChange}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleAddNewRoomType}
          >
            Add
          </button>
        </div>
      )}
      {feedbackMessage && (
        <div className="alert alert-info mt-2">{feedbackMessage}</div>
      )}
    </>
  );
};

RoomTypeSelector.propTypes = {
  handleRoomInputChange: PropTypes.func.isRequired,
  newRoom: PropTypes.shape({
    roomType: PropTypes.string.isRequired,
  }).isRequired,
};

export default RoomTypeSelector;
