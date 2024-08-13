import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9192",
});

export async function addRoom(photo, roomType, roomPrice) {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);

  try {
    const response = await api.post("/rooms/add/new-room", formData);
    return response.status === 200;
  } catch (error) {
    console.error("Error adding room:", error);
    throw new Error("Error adding room");
  }
}

export async function getRoomTypes() {
  try {
    const response = await api.get("/rooms/room/types");
    return response.data;
  } catch (error) {
    console.error("Error fetching room types:", error);
    throw new Error("Error fetching room types");
  }
}

export async function getAllRooms() {
  try {
    const result = await api.get("/rooms/all");
    return result.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw new Error("Error fetching rooms");
  }
}

export async function deleteRoom(roomId) {
  try {
    const result = await api.delete(`/rooms/delete/${roomId}`);
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

export async function updateRoom(roomId, roomData) {
  const formData = new FormData();
  formData.append("roomType", roomData.roomType);
  formData.append("roomPrice", roomData.roomPrice);
  formData.append("photo", roomData.photo);

  try {
    const response = await api.put(`/rooms/edit/${roomId}`, formData);
    console.log('Update Room Response:', response); // Log the response
    return response;
  } catch (error) {
    console.error('Error updating room:', error); // Log the error
    throw error; // Rethrow the error so it can be caught in the component
  }
}

export async function getRoomById(roomId) {
  try {
    const result = await api.get(`/rooms/room/${roomId}`);
    return result.data;
  } catch (error) {
    throw new Error(`Error fetching room: ${error.message}`);
  }
}

export async function editRoom(roomId, roomData) {
  const formData = new FormData();
  formData.append("roomType", roomData.roomType);
  formData.append("roomPrice", roomData.roomPrice);
  if (roomData.photo) {
    formData.append("photo", roomData.photo);
  }

  try {
    console.log('Sending editRoom request with:', { roomId, roomData });
    const response = await api.put(`/rooms/edit/${roomId}`, formData);
    console.log('Edit Room Response:', response); // Log the response
    return response;
  } catch (error) {
    console.error('Error editing room:', error); // Log the error
    if (error.response) {
      console.error('Response data:', error.response.data); // Server response
    }
    throw error; // Rethrow the error so it can be caught in the component
  }
}