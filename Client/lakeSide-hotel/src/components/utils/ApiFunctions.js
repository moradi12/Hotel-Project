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
    throw new Error("Error deleting room");
  }
}

export async function editRoom(roomId, photo, roomType, roomPrice) {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);

  try {
    const response = await api.put(`/rooms/edit/${roomId}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error editing room:", error);
    throw new Error("Error editing room");
  }
}
