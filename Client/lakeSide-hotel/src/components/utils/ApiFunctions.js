import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9192",
});

export async function addRoom(photo, roomType, roomPrice) {
  const fromDate = new FormData();
  fromDate.append("photo", photo);
  fromDate.append("roomType", roomType);
  fromDate.append("roomPrice", roomPrice);

  const response = await api.post("/rooms/add/new-room", fromDate);
  if (response.status === 201) {
    return true;
  } else return false;
}

export async function getRoomTypes() {
  try {
    const response = await api.get("/rooms/room-types");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching room types");
  }
}
export async function getAllRooms() {
  try {
    const result = await api.get("/rooms/all-rooms");
    return result.data;
  } catch (error) {
    throw new Error("Error fetching  rooms");
  }
}
