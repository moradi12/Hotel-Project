import axios from "axios";
const API_BASE_URL = "http://localhost:9192";
export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Function to add a room
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
    throw new Error(error.response?.data || "Error adding room");
  }
}

// Function to get all room types
export async function getRoomTypes() {
  try {
    const response = await api.get("/rooms/room/types");
    return response.data;
  } catch (error) {
    console.error("Error fetching room types:", error);
    throw new Error(error.response?.data || "Error fetching room types");
  }
}

// Function to get all rooms
export async function getAllRooms() {
  try {
    const response = await api.get("/rooms/all");

    console.log("Raw API response:", response.data); // Log the raw response

    if (!Array.isArray(response.data)) {
      throw new Error("API response is not an array");
    }

    // Simplify the response data by removing circular references and nested objects
    const simplifiedRooms = response.data.map((room) => {
      return {
        id: room.id,
        roomType: room.roomType,
        roomPrice: room.roomPrice,
        photo: room.photo,
        booked: room.booked || false, // Assuming 'booked' is a boolean or derived from bookings
      };
    });

    return simplifiedRooms;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw new Error(error.response?.data || "Error fetching rooms");
  }
}
// Function to delete a room
export async function deleteRoom(roomId) {
  try {
    const response = await api.delete(`/rooms/delete/${roomId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting room:", error);
    throw new Error(error.response?.data || "Error deleting room");
  }
}

// Function to update a room
export async function updateRoom(roomId, roomData) {
  const formData = new FormData();
  formData.append("roomType", roomData.roomType);
  formData.append("roomPrice", roomData.roomPrice);
  formData.append("photo", roomData.photo);

  try {
    const response = await api.put(`/rooms/update/${roomId}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating room:", error);
    throw new Error(error.response?.data || "Error updating room");
  }
}

// Function to get room by ID
export async function getRoomById(roomId) {
  try {
    const response = await api.get(`/rooms/room/${roomId}`);
    
    if (!response.data || typeof response.data !== 'object') {
      throw new Error("API response is not an object");
    }

    return response.data;
  } catch (error) {
    console.error(`Error fetching room: ${error.message}`);
    throw new Error(error.response?.data || `Error fetching room`);
  }
}

// Function to edit a room
export async function editRoom(roomId, roomData) {
  const formData = new FormData();
  formData.append("roomType", roomData.roomType);
  formData.append("roomPrice", roomData.roomPrice);
  if (roomData.photo) {
    formData.append("photo", roomData.photo);
  }

  try {
    const response = await api.put(`/rooms/edit/${roomId}`, formData);
    return response.data;
  } catch (error) {
    console.error('Error editing room:', error);
    throw new Error(error.response?.data || 'Error editing room');
  }
}

// Function to book a room
export async function bookRoom(roomId, booking) {
  try {
    const response = await api.post(`/bookings/room/${roomId}/booking`, booking);
    return response.data;
  } catch (error) {
    console.error(`Error booking room: ${error.message}`);
    throw new Error(error.response?.data || `Error booking room`);
  }
}

// Function to get all bookings
export async function getAllBookings() {
  try {
    const response = await api.get("/bookings/all-bookings");
    
    if (!Array.isArray(response.data)) {
      throw new Error("API response is not an array");
    }

    return response.data;
  } catch (error) {
    console.error(`Error fetching bookings: ${error.message}`);
    throw new Error(error.response?.data || `Error fetching bookings`);
  }
}

// Function to get booking by confirmation code
export async function getBookingByConfirmationCode(confirmationCode) {
  try {
    const response = await api.get(`/bookings/confirmation/${confirmationCode}`);
    
    if (!response.data || typeof response.data !== 'object') {
      throw new Error("API response is not an object");
    }

    return response.data;
  } catch (error) {
    console.error(`Error finding booking: ${error.message}`);
    throw new Error(error.response?.data || `Error finding booking`);
  }
}

// Function to cancel a booking
export async function cancelBooking(bookingId) {
  try {
    const response = await api.delete(`/bookings/booking/${bookingId}/delete`);
    return response.data;
  } catch (error) {
    console.error(`Error cancelling booking: ${error.message}`);
    throw new Error(error.response?.data || `Error cancelling booking`);
  }
}

// Function to add a new user
export async function addUser(userData) {
  try {
    const response = await api.post("/users/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw new Error(error.response?.data || "Error adding user");
  }
}

// Function to authenticate a user
export async function authenticateUser(credentials) {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Error authenticating user:", error);
    throw new Error(error.response?.data || "Error authenticating user");
  }
}

// Function to get user profile by ID
export async function getUserProfile(userId) {
  try {
    const response = await api.get(`/users/profile/${userId}`);
    
    if (!response.data || typeof response.data !== 'object') {
      throw new Error("API response is not an object");
    }

    return response.data;
  } catch (error) {
    console.error(`Error fetching user profile: ${error.message}`);
    throw new Error(error.response?.data || `Error fetching user profile`);
  }
}

// Function to update user profile
export async function updateUserProfile(userId, userData) {
  try {
    const response = await api.put(`/users/profile/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user profile: ${error.message}`);
    throw new Error(error.response?.data || `Error updating user profile`);
  }
}

// Function to delete a user account
export async function deleteUserAccount(userId) {
  try {
    const response = await api.delete(`/users/delete/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user account: ${error.message}`);
    throw new Error(error.response?.data || `Error deleting user account`);
  }
}

// Function to get all users (admin functionality)
export async function getAllUsers() {
  try {
    const response = await api.get("/users/all");
    
    if (!Array.isArray(response.data)) {
      throw new Error("API response is not an array");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error(error.response?.data || "Error fetching users");
  }
}

// Function to log out a user
export async function logoutUser() {
  try {
    const response = await api.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw new Error(error.response?.data || "Error logging out");
  }
}

// Function to delete a booking
export async function deleteBooking(bookingId) {
  try {
    const response = await api.delete(`/bookings/delete/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw new Error(error.response?.data || "Error deleting booking");
  }
}

