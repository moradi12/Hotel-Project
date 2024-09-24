import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoomModel } from '../../Models/RoomModel';

// Define the initial state
interface RoomState {
  rooms: RoomModel[];
  loading: boolean;
  error: string | null;
}

const initialState: RoomState = {
  rooms: [],
  loading: false,
  error: null,
};

// Create a slice for rooms
const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    fetchRoomsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchRoomsSuccess(state, action: PayloadAction<RoomModel[]>) {
      state.loading = false;
      state.error = null;
      state.rooms = action.payload;
    },
    fetchRoomsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addRoom(state, action: PayloadAction<RoomModel>) {
      state.rooms.push(action.payload);
    },
    deleteRoom(state, action: PayloadAction<number>) {
      state.rooms = state.rooms.filter(room => room.id !== action.payload);
    },
  },
});

export const {
  fetchRoomsStart,
  fetchRoomsSuccess,
  fetchRoomsFailure,
  addRoom,
  deleteRoom,
} = roomSlice.actions;

// Export the reducer function
export default roomSlice.reducer;
