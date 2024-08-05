import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { getRoomTypes } from "../utils/ApiFunctions";

const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState("");

  useEffect(() => {
    getRoomTypes().then((data) => {
      setRoomTypes(data);
    });
  }, []);

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomType(e.target.value);
  };

  // const handleAddNewRoomType = () => {
  //   if (newRoomType.trim() !== "") {
  //     setRoomTypes([...roomTypes, newRoomType]);
  //     handleRoomInputChange({ target: { name: "roomType", value: newRoomType } });
  //     setNewRoomType(""); //
  //     setShowNewRoomTypeInput(false); 
  //   }
  // };

  const handleAddNewRoomType = () => {

    if (newRoomType!== "") {
         setRoomTypes([...roomTypes, newRoomType]);
     setNewRoomType(""); 
     setShowNewRoomTypeInput(false)
    }
  }
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