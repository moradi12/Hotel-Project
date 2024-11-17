import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getRoomTypes } from "../utils/ApiFunctions";

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  useEffect(() => {
    // Fetch the room types when the component is mounted
    const fetchRoomTypes = async () => {
      try {
        const data = await getRoomTypes();
        setRoomTypes(data);
      } catch (error) {
        console.error("Error fetching room types:", error);
      }
    };

    fetchRoomTypes();
  }, []);

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomType(e.target.value);
  };

  const handleAddNewRoomType = () => {
    const trimmedRoomType = newRoomType.trim();
    if (trimmedRoomType !== "") {
      if (!roomTypes.includes(trimmedRoomType)) {
        setRoomTypes([...roomTypes, trimmedRoomType]);
        handleRoomInputChange({
          target: { name: "roomType", value: trimmedRoomType },
        });
        setFeedbackMessage("New room type added successfully!");
      } else {
        setFeedbackMessage("Room type already exists!");
      }
      // Clear the feedback message after a few seconds
      setTimeout(() => setFeedbackMessage(""), 3000);
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
