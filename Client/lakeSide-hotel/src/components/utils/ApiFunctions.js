import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9192", // Link: Base URL for the API
});

// Link: addRoom function
export async function addRoom(photo, roomType, roomPrice) {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);

  try {
    const response = await api.post("/rooms/add/new-room", formData); // Link: POST request to add a new room
    return response.status === 200;
  } catch (error) {
    console.error("Error adding room:", error);
    throw new Error("Error adding room");
  }
}

// Link: getRoomTypes function
export async function getRoomTypes() {
  try {
    const response = await api.get("/rooms/room/types"); // Link: GET request to fetch room types
    return response.data;
  } catch (error) {
    console.error("Error fetching room types:", error);
    throw new Error("Error fetching room types");
  }
}

// Link: getAllRooms function
export async function getAllRooms() {
  try {
    const result = await api.get("/rooms/all"); // Link: GET request to fetch all rooms
    return result.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw new Error("Error fetching rooms");
  }
}

// Link: deleteRoom function
export async function deleteRoom(roomId) {
  try {
    const result = await api.delete(`/rooms/delete/${roomId}`); // Link: DELETE request to remove a room by ID
    return result.data;
  } catch (error) {
    console.error("Error deleting room:", error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error("Error deleting room");
    }
  }
}

// Link: updateRoom function
export async function updateRoom(roomId, roomData) {
  const formData = new FormData();
  formData.append("roomType", roomData.roomType);
  formData.append("roomPrice", roomData.roomPrice);
  formData.append("photo", roomData.photo);

  try {
    const response = await api.put(`/rooms/edit/${roomId}`, formData); // Link: PUT request to update a room by ID
    console.log('Update Room Response:', response); // Log the response
    return response;
  } catch (error) {
    console.error('Error updating room:', error); // Log the error
    throw error; // Rethrow the error so it can be caught in the component
  }
}

// Link: getRoomById function
export async function getRoomById(roomId) {
  try {
    const result = await api.get(`/rooms/room/${roomId}`); // Link: GET request to fetch a room by ID
    return result.data;
  } catch (error) {
    throw new Error(`Error fetching room: ${error.message}`);
  }
}

// Link: editRoom function
export async function editRoom(roomId, roomData) {
  const formData = new FormData();
  formData.append("roomType", roomData.roomType);
  formData.append("roomPrice", roomData.roomPrice);
  if (roomData.photo) {
    formData.append("photo", roomData.photo);
  }

  try {
    console.log('Sending editRoom request with:', { roomId, roomData }); // Log the request data
    const response = await api.put(`/rooms/edit/${roomId}`, formData); // Link: PUT request to edit a room by ID
    console.log('Edit Room Response:', response); // Log the response
    return response;
  } catch (error) {
    console.error('Error editing room:', error); // Log the error
    if (error.response) {
      console.error('Response data:', error.response.data); // Log server response data
    }
    throw error; // Rethrow the error so it can be caught in the component
  }
}
