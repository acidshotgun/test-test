import { configureStore } from "@reduxjs/toolkit";
import trainsReducer from "./slices/trains";

const store = configureStore({
  reducer: {
    trains: trainsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
