import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./AuthReducer";
import { CustomerReducer } from "C:/Users/tamir/OneDrive/Desktop/Hotel-Project-master/Client/lakeSide-hotel/src/components/common/Redux/CustomerReducer.ts"; // Updated import path

const reducers = combineReducers({ 
    auth: AuthReducer,
    customer: CustomerReducer // Updated the reducer key from 'company' to 'customer'
});

export const hotelSystem = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});
