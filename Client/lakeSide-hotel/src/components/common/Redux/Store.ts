// store.ts
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./AuthReducer";
import { CustomerReducer } from "./CustomerReducer";
import RoomReducers from "./RoomReducers";

const reducers = combineReducers({ 
    auth: AuthReducer,
    customer: CustomerReducer, 
    rooms: RoomReducers 
});

export const hotelSystem = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});
