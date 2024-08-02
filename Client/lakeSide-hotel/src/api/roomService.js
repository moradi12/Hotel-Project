// src/api/roomService.js
import axios from 'axios';

// פונקציה לקריאה לכל החדרים
export const getAllRooms = async () => {
  try {
    const response = await axios.get('/api/rooms/all'); // עדכן את הנתיב לפי ה-API שלך
    return response.data;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};

// פונקציות נוספות יכולות להיווסף כאן, כמו הוספה, עדכון או מחיקה של חדרים
